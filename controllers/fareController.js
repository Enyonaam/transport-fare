import { createFare, getFares, getASingleFareById, updateFare } from '../models/fareModel.js';

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

    const formattedFares = fares.map((fare) => ({
      id: fare.id,
      amount: fare.amount,
      effective_from: fare.effective_from,
      effective_to: fare.effective_to,
      created_at: fare.created_at,

      route: {
        id: fare.route_id,

        from_location: {
          id: fare.from_location_id,
          name: fare.from_location_name,
          description: fare.from_location_description
        },

        to_location: {
          id: fare.to_location_id,
          name: fare.to_location_name,
          description: fare.to_location_description
        }
      }
    }));

    return res.status(200).json({
      fares: formattedFares
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


export const updateFareController = async (req, res) => {
  try {
    const { id } = req.params;

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

    const result = await updateFare(
      id,
      route_id,
      amount,
      effective_from,
      effective_to
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Fare not found'
      });
    }

    return res.status(200).json({
      message: 'Fare updated successfully'
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
};




