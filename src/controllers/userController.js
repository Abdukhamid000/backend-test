import { validationResult } from "express-validator";
import { registerUser, getUserByUsername } from "../models/userModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function register(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  // check for existence
  const existingUser = await getUserByUsername(username);

  if (existingUser) {
    return res.status(400).json({ error: "User already exist" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(password, salt);

  const user = await registerUser(username, hashedPw);
  console.log(user);
  res.status(200).json({ message: "success", user });
}

async function login(req, res) {
  const { username, password } = req.body;

  const existingUser = await getUserByUsername(username);

  if (!existingUser) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const isPwValid = await bcrypt.compare(password, existingUser.password);

  if (!isPwValid) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  jwt.sign(
    { username, password },
    "helloworld",
    { expiresIn: "1h" },
    (err, token) => {
      if (err) {
        return res.status(400).json({ error: "token error" });
      }
      res.status(200).json({ token });
    }
  );
}

export { register, login };
