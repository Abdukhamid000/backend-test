import express from 'express'
import { authenticateToken } from '../middlewares/authMiddleware.js'
import {register} from '../controllers/userController.js'
import {registerValidator} from '../validators/userValidator.js'
import { body } from 'express-validator'

const router = express.Router()

router.get('/', authenticateToken)

router.post('/register', [body('username').isString()], register)

router.get("/test", function (req, res) {
  res.send("About this wiki");
});

export default router