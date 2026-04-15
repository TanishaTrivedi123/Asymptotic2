const {allowedTopics} = require("../constants/allowedTopics");

function detectTopicFromText(question){
    const lower = question.toLowerCase();  //convert question to lowercase

    //return first matching topic from allowedTopics
    return allowedTopics.find(topic => lower.includes(topic.toLowerCase()));
}

module.exports = {detectTopicFromText}