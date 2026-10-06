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

export const getFares = async (id) => {
  const [rows] = await pool.query(
      'SELECT * FROM fares',  
  );

  return rows;

};

export const getASingleFareById = async (id) => {
  const [rows] = await pool.query(
      'SELECT * FROM Fares WHERE id = ?',
      [id]
  );
  return rows[0];

};

