import pool from "./pool.js";

const addStreamModel = async (title, description, streamkey, username) => {
  try {
    const query = 'INSERT INTO streams (title, description, streamkey, username) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [title, description, streamkey, username];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error('Error adding stream');
  }
};

export default addStreamModel;
