const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

let serviceAccount;

try {
  // Parse FIREBASE_KEY from environment
  serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

  // Fix private key line breaks
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
} catch (error) {
  console.error("Firebase init error:", error);
}

const db = admin.firestore();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running ✅ with Firebase");
});

// Example: Add user to Firestore
app.post("/add-user", async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ message: "username & email required" });
    }

    await db.collection("users").add({ username, email, createdAt: new Date() });
    res.status(201).json({ message: "User saved in Firestore ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
