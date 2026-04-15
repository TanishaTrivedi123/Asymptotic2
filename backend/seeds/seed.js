//is file ka kaam hai tumhare predefined questions ko mongodb me insert karna

const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const Question = require("../models/QuestionsModel");
const connectDB = require("../db");
const linkedList = require("./questions/linkedList.seed");
const array = require("./questions/array.seed")
const innovixus = require("./questions/innovixus.seed")

// Connect to MongoDB
connectDB();

const seedDB = async () => {
  try {
    // Clear old questions
    await Question.deleteMany();

    //Insert linked list questions
    await Question.insertMany([...linkedList, ...array, ...innovixus]);
    console.log("Questions inserted successfully");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
