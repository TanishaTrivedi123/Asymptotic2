// 1 Chat = 1 chat window / 1 sidebar item

const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        showYesButton: {
          type: Boolean,
          default: false,
        },
        topic: {
          type: String,
          default: null,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    currentContext: {
      type:{
        type: String,
        default: null,   //"Awaiting_Confirmation"
      },
      topic: {
        type: String,
        default: null,   //"arrays", "sliding window"
      }
    }

  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;
