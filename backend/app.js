const express = require("express");
const app = express();
require("dotenv").config();
const connecDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const aiRoutes = require("./routes/aiRoutes");
const ideRoutes = require("./routes/ideRoutes")
const cors = require("cors");

connecDB();

const PORT = process.env.PORT || 5000;

//cors
app.use(cors());

//middleware
app.use(express.json());

//authentication route
app.use("/api/auth", authRoutes);

//forgot password ans reset link route
app.use("/api/auth", passwordRoutes);

//AI routes
app.use("/api/chat", aiRoutes);

// ide routes
app.use("/api/ide", ideRoutes);

app.get("/", (req, res) => {
  res.send("Jai Shree Krishn");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
