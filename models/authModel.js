import pool from '../config/db.js';

export const createUser = async (
  firstName,
  lastName,
  email,
  password
) => {
  const [result] = await pool.execute(
    `INSERT INTO users 
    (first_name, last_name, email, password)
    VALUES (?, ?, ?, ?)`,
    [firstName, lastName, email, password]
  );

  return result;
};

// Function
export const findUserByEmail = async (email) => {
  const [rows] = await pool.execute(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  return rows[0];
};

