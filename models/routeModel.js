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


export const getRoutes = async () => {
  const [rows] = await pool.query(`
    SELECT
      routes.id,
      routes.created_at,

      from_location.id AS from_location_id,
      from_location.name AS from_location_name,
      from_location.description AS from_location_description,

      to_location.id AS to_location_id,
      to_location.name AS to_location_name,
      to_location.description AS to_location_description

    FROM routes

    JOIN locations AS from_location
      ON routes.from_location_id = from_location.id

    JOIN locations AS to_location
      ON routes.to_location_id = to_location.id
  `);

  return rows;
};

export const getASingleRouteById = async (id) => {
    const [rows] = await pool.execute(
      `SELECT
         r.id,
         r.created_at,
  
         from_location.id AS from_location_id,
         from_location.name AS from_location_name,
         from_location.description AS from_location_description,
  
         to_location.id AS to_location_id,
         to_location.name AS to_location_name,
         to_location.description AS to_location_description
  
       FROM routes r
  
       JOIN locations AS from_location
         ON r.from_location_id = from_location.id
  
       JOIN locations AS to_location
         ON r.to_location_id = to_location.id
  
       WHERE r.id = ?`,
      [id]
    );
  
    if (rows.length === 0) {
      return null;
    }
  
    const route = rows[0];
  
    return {
      id: route.id,
      from_location: {
        id: route.from_location_id,
        name: route.from_location_name,
        description: route.from_location_description
      },
      to_location: {
        id: route.to_location_id,
        name: route.to_location_name,
        description: route.to_location_description
      },
      created_at: route.created_at
    };
  };

export const updateRoute = async (
    id,
    from_location_id,
    to_location_id
  ) => {
    const [result] = await pool.execute(
      `UPDATE routes
       SET from_location_id = ?,
           to_location_id = ?
       WHERE id = ?`,
      [from_location_id, to_location_id, id]
    );
  
    return result;
  };

  export const deleteRoute = async (id) => {
    const [result] = await pool.execute(
      `DELETE FROM routes
       WHERE id = ?`,
      [id]
    );
  
    return result;
  };