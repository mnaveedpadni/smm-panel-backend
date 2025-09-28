const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

// CORS allow for all
app.use(cors());

app.get("/", (req, res) => {
  res.send("✅ SMM Panel Backend is Running!");
});

// Example register route
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  res.json({
    message: "User registered successfully",
    user: username,
  });
});

module.exports = app;
