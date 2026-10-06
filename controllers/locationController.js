import { createLocation } from '../models/locationModel.js';

export const createLocationController = async (req, res) => {
  try {
    const {
      name,
      description
    } = req.body || {};

    if (!name) {
      return res.status(400).json({
        message: 'name is required'
      });
    }

    const result = await createLocation(
      name,
      description
    );

    return res.status(201).json({
      message: 'Location created successfully',
      locationId: result.insertId
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
};