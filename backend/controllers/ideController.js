const axios = require("axios")
const Question = require("../models/QuestionsModel")

// ----------------------here we get the particular question according to id---------------------------

const getQuestionByIDController = async (req, res) => {
    try {
        const { topic, id } = req.params

        // validation
        if (!topic || !id) {
            return res.status(400).json({
                msg: "Topic and ID are required"
            })
        }

        // correct query
        const question = await Question.findOne({
            topic,
            customId: String(id)
        })

        // not found
        if (!question) {
            return res.status(404).json({
                msg: "Question not found"
            })
        }

        // success
        res.status(200).json({
            msg: "Question fetched successfully",
            question
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

// -----------------------------here to get all the topics--------------------
const getUniqueTopicsController = async (req,res) => {
    try{
        const topics = await Question.distinct("topic");

        res.status(200).json({msg: "fetched all the unique topics", topics});
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg: "Internal Server Error"})
    }
}

// ---------------------here to compile the code given by user through judge0 api and send the result in frontend
const codeRunner =  async (req, res) => {
  try {
    const { code, language_id, input } = req.body;

    //  YAHI USE HO RAHA HAI JUDGE0 LINK
    const submission = await axios.post(
      "https://ce.judge0.com/submissions?base64_encoded=false&wait=false",
      {
        source_code: code,
        language_id: language_id,
        stdin: input,
      },
    );

    const token = submission.data.token;

    let result;

    while (true) {
      const response = await axios.get(
        `https://ce.judge0.com/submissions/${token}?base64_encoded=false`,
      );

      result = response.data;

      if (result.status.id <= 2) {
        await new Promise((r) => setTimeout(r, 1000));
      } else {
        break;
      }
    }

    res.json({
      output: result.stdout,
      error: result.stderr,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Execution failed" });
  }
};

module.exports = {getQuestionByIDController, getUniqueTopicsController, codeRunner}