const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();
const {getQuestionByIDController, getUniqueTopicsController, codeRunner} = require("../controllers/ideController")

// -------------route to get particular id question---------------
router.get("/:topic/:id", authMiddleware, getQuestionByIDController)

// ----------------route to get unique topics----------------
router.get("/all-topic", authMiddleware, getUniqueTopicsController)

// -------------------here i use judge0 CE api to compile the code given by user and check the test cases
router.post("/run-code", codeRunner)

module.exports = router