import pool from '../config/db.js';

export const createLocation = async (name, description) => {
  const [result] = await pool.execute(
    `INSERT INTO locations
    (name, description)
    VALUES (?, ?)`,
    [name, description]
  );

  return result;
};

