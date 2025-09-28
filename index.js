const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  res.status(201).json({ message: "User registered", user: username });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "test" && password === "1234") {
    return res.status(200).json({ message: "Login successful" });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

// ❌ Do NOT use app.listen()
// ✅ Instead export the app for Vercel
module.exports = app;
