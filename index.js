```javascript
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Simple in-memory "database"
let users = [];

// Register endpoint
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const userExists = users.find((u) => u.username === username);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully", user: username });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  return res.status(200).json({ message: "Login successful", user: username });
});

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Export for Vercel
module.exports = app;
```
