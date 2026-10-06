import { createFare, getFares, getASingleFareById } from '../models/fareModel.js';

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

export const getFaresController = async (req, res) => {
  try {
    const fares = await getFares();

    return res.status(200).json({
      fares
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
};

export const getASingleFareByIdController = async (req, res) => {
    try {
        const {id} = req.params;

       const singleFare = await getASingleFareById(id);

        if(!singleFare) {
            return res.status(404).json({
                message: 'Single fare not found'
            });
        } 

        res.status(200).json(singleFare);
         
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};




