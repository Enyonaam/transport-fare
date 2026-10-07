import { createRoute, getRoutes, getASingleRouteById, updateRoute, deleteRoute} from '../models/routeModel.js';


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
        message: error.message
    //   message: 'Server error'
    });
  }
};


export const getRoutesController = async (req, res) => {
  try {
    const routes = await getRoutes();

    const formattedRoutes = routes.map((route) => ({
      id: route.id,

      from_location: {
        id: route.from_location_id,
        name: route.from_location_name,
        description: route.from_location_description
      },

      to_location: {
        id: route.to_location_id,
        name: route.to_location_name,
        description: route.to_location_description
      },

      created_at: route.created_at
    }));

    return res.status(200).json({
      routes: {
        route: formattedRoutes
      }
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

export const updateRouteController = async (req, res) => {
    try {
      const { id } = req.params;
      const { from_location_id, to_location_id } = req.body;
  
      if (!from_location_id || !to_location_id) {
        return res.status(400).json({
          message: 'from_location_id and to_location_id are required'
        });
      }
  
      if (from_location_id === to_location_id) {
        return res.status(400).json({
          message: 'From location and to location cannot be the same'
        });
      }
  
      const result = await updateRoute(
        id,
        from_location_id,
        to_location_id
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'Route not found'
        });
      }
  
      return res.status(200).json({
        message: 'Route updated successfully'
      });
  
    } catch (error) {
      console.error(error);
  
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          message: 'This route already exists'
        });
      }
  
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({
          message: 'One or both location IDs do not exist'
        });
      }
  
      return res.status(500).json({
        message: 'Server error'
      });
    }
  };

  export const deleteRouteController = async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await deleteRoute(id);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'Route not found'
        });
      }
  
      return res.status(200).json({
        message: 'Route deleted successfully'
      });
  
    } catch (error) {
      console.error(error);
  
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({
          message: 'Cannot delete route because it is being used by a fare'
        });
      }
  
      return res.status(500).json({
        message: 'Server error'
      });
    }
  };
