import pool from '../config/db.js';

export const getUsers = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM Users ORDER BY created_at DESC'
    );

    return rows;
};


export const getASingleUserById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM Users WHERE id = ?',
        [id]
    );
    return rows[0];

};

export const updateUser = async (
    id,
    firstName,
    lastName,
    email
  ) => {
    const [result] = await pool.execute(
      `UPDATE users
       SET first_name = ?,
           last_name = ?,
           email = ?
       WHERE id = ?`,
      [firstName, lastName, email, id]
    );
  
    return result;
  };

  export const deleteUser = async (id) => {
    const [result] = await pool.execute(
      `DELETE FROM users
       WHERE id = ?`,
      [id]
    );
  
    return result;
  };