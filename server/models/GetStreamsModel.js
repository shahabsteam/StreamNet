import pool from "./pool.js";
const getStreams = async () => {
  try {
    const query = 'SELECT * FROM streams';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error('Error retrieving streams');
  }
};

export default getStreams;