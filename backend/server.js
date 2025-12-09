import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { db } from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

// Register API
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) return res.json({ message: "Email already exists!" });

    res.json({ message: "Registered Successfully!" });
  });
});

// Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err || results.length === 0)
      return res.json({ message: "Invalid Credentials" });

    const user = results[0];

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid)
      return res.json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET);

    res.json({ message: "Login Success", token, name: user.name });
  });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
