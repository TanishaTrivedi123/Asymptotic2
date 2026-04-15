const Chat = require("../models/ChatModel");
const { SYSTEM_PROMPT } = require("../utils/systemPrompt");
const { generateAIResponse } = require("../services/modelFallbackService");
const {detectYesNoIntent} = require("../utils/intentDetector")
const { detectTopicFromText } = require("../utils/topicDetector");
const Question = require("../models/QuestionsModel")

// ---------------------here we take the title from AI, question of user and response of AI and store it in database------------------
const askQuestionController = async (req, res) => {
  try {
    const { question, chatId } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({ message: "Question required" });
    }

    const normalizedQuestion = question.trim();
    const intent = detectYesNoIntent(normalizedQuestion)

    let chat;
    let title;

    //existing chat -> yes / no handle karna
    if(chatId){
      chat = await Chat.findOne({
        _id: chatId,
        userID: req.user.id,
      })

    if(!chat){
      return res.status(403).json({message: "Access denied"});
    }

    //when user says yes
    if(intent === "YES" && chat.currentContext?.type ==="AWAITING_CONFIRMATION"){

          //store user YES
          chat.messages.push({
            role: "user",
            content: question,
          })
          const topic = chat.currentContext.topic;

          //AI positive message
          const positivePrompt = `
          User agreed to practice questions on ${topic}.
          Reply in a friendly, motivating tone.
          Keep it short (2-3 lines).
          End by telling user to click the button below.
          `

          const aiPositiveReply = await generateAIResponse([
            {role: "system", content: SYSTEM_PROMPT},
            {role: "user", content: positivePrompt},
          ]);

          chat.messages.push({
            role: "assistant",
            content: aiPositiveReply,
            showYesButton: true,
            topic: topic,
          })

          //context clear
          chat.currentContext = null;
          await chat.save();

          return res.status(200).json({chat});
    }

    //when user says no
    if(intent === "NO" && chat.currentContext?.type === "AWAITING_CONFIRMATION"){
      chat.messages.push({
        role: "assistant",
        content: "No problem 😊 Keep practicing, you’re doing great!",
      });

      chat.currentContext = null;
      await chat.save();

      return res.status(200).json({chat});
    }
  }

  //-------normal question flow----------
  const detectedTopic = detectTopicFromText(normalizedQuestion)

    //  FIRST CHAT → generate title
    if (!chatId) {
      const titlePrompt = `Generate a short, clear title (max 5 words).
Only return the title.

Question: "${question}"`;

      title = await generateAIResponse([
        { role: "user", content: titlePrompt },
      ]);
    }

    //  Generate answer (with fallback)
    const answer = await generateAIResponse([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: question },
    ]);

    let finalAnswer = answer;

    if(detectedTopic){
      finalAnswer += `
      Would you like pattern-based interview questions from ${detectedTopic}? (Yes / No)
      `
    }

    //  Save in DB
    if (!chatId) {
      chat = await Chat.create({
        userID: req.user.id,
        title,
        messages: [
          { role: "user", content: question },
          { role: "assistant", content: finalAnswer },
        ],
        currentContext: detectedTopic ? {type: "AWAITING_CONFIRMATION", topic: detectedTopic,} : null
      });
    } else {
      chat = await Chat.findOne({
        _id: chatId,
        userID: req.user.id,
      });

      if (!chat) {
        return res.status(403).json({ message: "Access denied" });
      }

      chat.messages.push(
        { role: "user", content: question },
        { role: "assistant", content: finalAnswer, showYesButton: false, topic: detectedTopic }
      );

      chat.currentContext = detectedTopic ? {
        type: "AWAITING_CONFIRMATION",
        topic: detectedTopic,
      } : null;
      
      await chat.save();
    }

    res.status(200).json({ chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// here we get all the titles from the database so the user will show it in sidebar

const getChatTitlesController = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({ userID: userId });

    const chatTitles = chats.map((chat) => ({
      id: chat._id,
      title: chat.title || chat.messages[0]?.content.substring(0, 3) + "...",
    }));

    res.status(200).json({ chats: chatTitles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching chat titles" });
  }
};

//---------------sidebar pr jab click karege to purane messages dikhane ke liye

const getChatByIdController = async (req, res) => {
  try {
    const chatId = req.params.id;

    const userId = req.user.id;

    const chat = await Chat.findOne({ _id: chatId, userID: userId });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({ chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching chat" });
  }
};

//-------------get question from the database according to the topic--------
const getQuestionByTopicController = async (req,res) => {
  try{
    const {topic} = req.query;

    if(!topic){
      return res.status(400).json({message: "Topic required"});
    }

    const questions = await Question.find({
      topic: topic
    }).limit(10);

    res.status(200).json({questions})
  }
  catch(error){
    console.error(error);
    res.status(500).json({message: "Server error"})
  }
}

module.exports = {
  askQuestionController,
  getChatTitlesController,
  getChatByIdController,
  getQuestionByTopicController
};
