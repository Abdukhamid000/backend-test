import dbConnection from "../configs/db.js";

async function getUserByUsername(username) {
  const sql = "SELECT * FROM users WHERE username = ?";

  const [rows] = await dbConnection.query(sql, [username]);
  return rows[0];
}

async function registerUser(username, password) {
  const sql = "INSERT INTO users (username, password) VALUES(?, ?)";

  try {
    const [res] = await dbConnection.query(sql, [username, password]);
    return res.insertId;
  } catch (err) {
    throw new Error("register error");
  }
}

export { registerUser, getUserByUsername };
