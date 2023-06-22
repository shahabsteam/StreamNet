

import pool from "./pool.js";

const deleteStreamModel = async (streamId) => {
  try {
    const query = 'DELETE FROM streams WHERE id = $1';
    const values = [streamId];
    await pool.query(query, values);
  } catch (error) {
    throw new Error('Error deleting stream');
  }
};


export default deleteStreamModel;