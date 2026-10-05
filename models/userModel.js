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