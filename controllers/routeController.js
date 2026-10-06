import { createRoute, getRoutes, getASingleRouteById} from '../models/routeModel.js';

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


export const getRoutesController = async (req, res) => {
  try {
    const route = await getRoutes();

    return res.status(200).json({
      route
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
};

export const getASingleRouteByIdController = async (req, res) => {
    try {
        const {id} = req.params;

       const singleRoute = await getASingleRouteById(id);

        if(!singleRoute) {
            return res.status(404).json({
                message: 'Single Route not found'
            });
        } 

        res.status(200).json(singleRoute);
         
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};
