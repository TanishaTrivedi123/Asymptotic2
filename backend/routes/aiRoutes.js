const express = require("express");
const {
  askQuestionController,
  getChatTitlesController,
  getChatByIdController,
  getQuestionByTopicController,
} = require("../controllers/chatController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

//POST request -> frontend AI question bhejega
router.post("/ask", authMiddleware, askQuestionController);

//GET -> get chat titles for sidebar
router.get("/titles", authMiddleware, getChatTitlesController);

//GET -> get topics when we click on button;
router.get("/topic", authMiddleware, getQuestionByTopicController)

//GET -> all messages of the chat when we click on sidebar
router.get("/:id", authMiddleware, getChatByIdController);

module.exports = router;
