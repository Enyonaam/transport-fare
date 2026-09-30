import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../models/userModel.js';

export const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: 'Email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(
      first_name,
      last_name,
      email,
      hashedPassword
    );

    res.status(201).json({
      message: 'User created successfully'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};