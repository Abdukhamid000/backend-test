import { body } from "express-validator";

export const registerValidator = [
  body("username")
    .notEmpty()
    .withMessage("username cannot be empty")
    .isLength({ min: 4 })
    .withMessage("more 4 length"),
];

export const loginValidator = [body("password").notEmpty()];
