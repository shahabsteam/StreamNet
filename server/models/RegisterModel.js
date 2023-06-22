
import pool from "./pool.js";

const createUser = async (username, password) => {
  try {
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const values = [username, password];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Error creating user');
  }
};

export default createUser;