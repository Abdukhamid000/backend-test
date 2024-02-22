import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { register, login } from "../controllers/userController.js";
import { registerValidator } from "../validators/userValidator.js";

const router = express.Router();

router.get("/", authenticateToken);

router.post("/register", registerValidator, register);

router.post("/login", login);

router.get("/test", function (req, res) {
  res.send("About this wiki");
});

export default router;
