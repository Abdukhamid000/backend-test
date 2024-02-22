import {getAllTodo, deleteTodo, createTodo, searchTodo, getTodoById} from '../models/todoModel.js'
import {validationResult, matchedData} from 'express-validator'

async function handleTodoList(req, res) {
  try {
    const todo = await getAllTodo();
    res.status(200).json(todo);
  } catch (error) {
    console.error('Error in getAllTodos controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleDeleteTodo(req, res) {

 const result = validationResult(req)

 if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }

  try {
  const existingTodo =  await getTodoById(req.params.id)

     if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const todo = await deleteTodo(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    console.error('Error in getAllTodos controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleCreateTodo(req, res) {
  try {
    const notEmptyString = property => body(property).notEmpty().isString();

   const { task_name, description, done } = req.body;

   if (!task_name || !description || typeof done !== 'boolean') {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const newTodo = await createTodo(task_name, description, done);

    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error in getAllTodos controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function handleSearchTodo(req, res) {
  try {
const result = validationResult(req);

 if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }

  const data = matchedData(req);

  const searchRes = await searchTodo(data.query)
    res.status(200).json(searchRes);
  } catch (error) {
    console.error('Error in getAllTodos controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


export {
    handleTodoList,
    handleDeleteTodo,
    handleCreateTodo,
    handleSearchTodo
}