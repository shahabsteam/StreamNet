
import pool from "./pool.js";

const getUserByUsername = async (username) => {
  try {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Error retrieving user'+error);
  }
};

export default  getUserByUsername;
