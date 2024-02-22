import express from 'express'
import { handleTodoList, handleDeleteTodo, handleCreateTodo, handleSearchTodo } from "../controllers/todoController.js";
import {query, param} from 'express-validator'   


const router = express.Router()

router.get('/', handleTodoList)
router.get('/search', query('query').notEmpty().withMessage('empty query').escape(), handleSearchTodo)
router.post('/create', handleCreateTodo)
router.delete('/delete/:id', param('id').notEmpty().withMessage('specify id').isNumeric(),  handleDeleteTodo)

export default router