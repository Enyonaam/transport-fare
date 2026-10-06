import { createFare } from '../models/fareModel.js';

export const createFareController = async (req, res) => {
  try {
    const {
      route_id,
      amount,
      effective_from,
      effective_to
    } = req.body;

    if (!route_id || !amount || !effective_from) {
      return res.status(400).json({
        message: 'route_id, amount and effective_from are required'
      });
    }

    const result = await createFare(
      route_id,
      amount,
      effective_from,
      effective_to
    );

    return res.status(201).json({
      message: 'Fare created successfully',
      fareId: result.insertId
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
};