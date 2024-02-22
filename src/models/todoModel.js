import dbConnection from '../configs/db.js';

async function getAllTodo() {
  try {
   const [res] = await dbConnection.query('SELECT * FROM todo')
   return res
  }catch(err) {

  }
}

async function deleteTodo(id) {
  try {
   const [res] = await dbConnection.query('DELETE FROM todo WHERE id = ?', [id])
   return 'deleted'
  }catch(err) {

  }
}

async function createTodo(task_name, description, done) {
  try {
   const [res] = await dbConnection.query('INSERT INTO todo (task_name, description, done) VALUES(?,?,?)', 
   [task_name, description, done])
  const newTodoId = res.insertId;
  console.log(res)

// Fetch the entire record of the newly created todo
const [newTodoRecord] = await dbConnection.query('SELECT * FROM todo WHERE id = ?', [newTodoId]);

// Return the entire record
return newTodoRecord;
  }catch(err) {

  }
}

async function searchTodo(query) {
  try {
    // Construct the SQL query for searching todos
    const sql = 'SELECT * FROM todo WHERE task_name LIKE ? OR description LIKE ?';
    const searchQuery = `%${query}%`;

    // Execute the search query
    const [searchResults] = await dbConnection.query(sql, [searchQuery, searchQuery]);

    // Return the search results
    return searchResults;
  } catch (err) {
    // Handle errors, log, or respond accordingly
    console.error('Error in searchTodos:', err);
    throw err;
  }
}

async function getTodoById(id) {
   const [result] = await dbConnection.query('SELECT * FROM todo WHERE id = ?', [id]) 
   console.log(result)

     if (result.length > 0) {
      return result[0]; // Return the first (and presumably only) result
    } else {
      return null; // Return null if no todo with the specified ID is found
    }
}


export {
    getAllTodo,
    deleteTodo,
    createTodo,
    searchTodo,
    getTodoById
}