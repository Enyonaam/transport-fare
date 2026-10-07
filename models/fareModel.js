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

export const getFares = async () => {
  const [rows] = await pool.query(`
    SELECT
      fares.id,
      fares.amount,
      fares.effective_from,
      fares.effective_to,
      fares.created_at,

      routes.id AS route_id,

      from_location.id AS from_location_id,
      from_location.name AS from_location_name,
      from_location.description AS from_location_description,

      to_location.id AS to_location_id,
      to_location.name AS to_location_name,
      to_location.description AS to_location_description

    FROM fares

    JOIN routes
      ON fares.route_id = routes.id

    JOIN locations AS from_location
      ON routes.from_location_id = from_location.id

    JOIN locations AS to_location
      ON routes.to_location_id = to_location.id
  `);

  return rows;
};

export const getASingleFareById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      fares.id,
      fares.amount,
      fares.effective_from,
      fares.effective_to,
      fares.created_at,

      routes.id AS route_id,

      from_location.id AS from_location_id,
      from_location.name AS from_location_name,
      from_location.description AS from_location_description,

      to_location.id AS to_location_id,
      to_location.name AS to_location_name,
      to_location.description AS to_location_description

    FROM fares

    JOIN routes
      ON fares.route_id = routes.id

    JOIN locations AS from_location
      ON routes.from_location_id = from_location.id

    JOIN locations AS to_location
      ON routes.to_location_id = to_location.id

    WHERE fares.id = ?
    `,
    [id]
  );

  return rows[0];
};



export const updateFare = async (
  id,
  route_id,
  amount,
  effective_from,
  effective_to
) => {
  const [result] = await pool.execute(
    `UPDATE fares
     SET route_id = ?,
         amount = ?,
         effective_from = ?,
         effective_to = ?
     WHERE id = ?`,
    [
      route_id,
      amount,
      effective_from,
      effective_to,
      id
    ]
  );

  return result;
};


export const deleteFare = async (id) => {
  const [result] = await pool.execute(
    `DELETE FROM fares
     WHERE id = ?`,
    [id]
  );

  return result;
};





