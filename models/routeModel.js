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

export const getRoutes = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM routes',  
    );
  
    return rows;
  
  };
  
  export const getASingleRouteById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM routes WHERE id = ?',
        [id]
    );
    return rows[0];
  
  };