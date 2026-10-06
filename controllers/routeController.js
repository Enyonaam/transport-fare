import { createRoute } from '../models/routeModel.js';

export const createRouteController = async (req, res) => {
  try {
    const {
      from_location_id,
      to_location_id
    } = req.body || {};

    if (!from_location_id || !to_location_id) {
      return res.status(400).json({
        message: 'from_location_id and to_location_id are required'
      });
    }

    const result = await createRoute(
      from_location_id,
      to_location_id
    );

    return res.status(201).json({
      message: 'Route created successfully',
      routeId: result.insertId
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
};