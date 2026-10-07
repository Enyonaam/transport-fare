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

export const getLocations = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM locations',  
    );
  
    return rows;
  
  };
  
  export const getASingleLocationById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM locations WHERE id = ?',
        [id]
    );
    return rows[0];
  
  };

  export const updateLocation = async (
    id,
    name,
    description
  ) => {
    const [result] = await pool.execute(
      `UPDATE locations
       SET name = ?,
           description = ?
       WHERE id = ?`,
      [name, description, id]
    );
  
    return result;
  };


  export const deleteLocation = async (id) => {
    const [result] = await pool.execute(
      `DELETE FROM locations
       WHERE id = ?`,
      [id]
    );
  
    return result;
  };




