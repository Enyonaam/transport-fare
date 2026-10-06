import { createLocation, getLocations, getASingleLocationById, updateLocation } from '../models/locationModel.js';

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
        message: 'Server error',
        error: error.message
      });
    
  }
};


export const getLocationsController = async (req, res) => {
  try {
    const location = await getLocations();

    return res.status(200).json({
      location
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Server error'
    });
  }
};

export const getASingleLocationByIdController = async (req, res) => {
    try {
        const {id} = req.params;

       const singleLocation = await getASingleLocationById(id);

        if(!singleLocation) {
            return res.status(404).json({
                message: 'Single location not found'
            });
        } 

        res.status(200).json(singleLocation);
         
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

export const updateLocationController = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
  
      if (!name) {
        return res.status(400).json({
          message: 'name is required'
        });
      }
  
      const result = await updateLocation(
        id,
        name,
        description
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'Location not found'
        });
      }
  
      return res.status(200).json({
        message: 'Location updated successfully'
      });
  
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        message: 'Server error'
      });
    }
  };








