import pool from '../config/db.js';

export const createFare = async (
  route_id,
  amount,
  effective_from,
  effective_to
) => {
  const [result] = await pool.execute(
    `INSERT INTO fares
    (route_id, amount, effective_from, effective_to)
    VALUES (?, ?, ?, ?)`,
    [route_id, amount, effective_from, effective_to]
  );

  return result;
};