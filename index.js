const express = require("express");
const app = express();

app.use(express.json());

// Test route
app.get("/", (req, res) => {
res.send("✅ SMM Panel Backend is Running!");
});

// Register API
app.post("/register", (req, res) => {
const { username, password } = req.body;
if (!username || !password) {
return res.status(400).json({ error: "Username and password required" });
}
res.json({ message: "User registered successfully", user: username });
});

// Login API
app.post("/login", (req, res) => {
const { username, password } = req.body;
if (username === "admin" && password === "1234") {
return res.json({ message: "Login successful", token: "fake-jwt-token" });
}
res.status(401).json({ error: "Invalid credentials" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
