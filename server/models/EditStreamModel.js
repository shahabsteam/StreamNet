import pool from "./pool.js";

const editStreamModel = async (streamid, title, description) => {
  try {
    const query = 'UPDATE streams SET title = $1, description = $2 WHERE id = $3 ';
    const values = [title, description, streamid];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Error editing stream');
  }
};

export default editStreamModel;