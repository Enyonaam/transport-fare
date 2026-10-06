import pool from '../config/db.js';

export const createRoute = async (
  from_location_id,
  to_location_id
) => {
  const [result] = await pool.execute(
    `INSERT INTO routes
    (from_location_id, to_location_id)
    VALUES (?, ?)`,
    [from_location_id, to_location_id]
  );

  return result;
};