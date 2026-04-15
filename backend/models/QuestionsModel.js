const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  customId: String,
  title: String,
  topic: String,
  difficulty: String,
  description: String,
  constraints: [String],
  examples: [
    {
      input: String,
      output: String,
      explanation: String,
    },
  ],
  testCases: [
    {
      input: String,
      output: String,
    }
  ]
});

module.exports = mongoose.model("Question", questionSchema);

// {} => ek object (Reason for bullet list in UI)
// [] => multiple values(for multiple test cases)
// [String] => strings ki list
//[{...}] => objects ki list
