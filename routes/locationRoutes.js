import express from 'express';

import { createLocationController } from '../controllers/locationController.js';
import { getLocationsController, getASingleLocationByIdController } from '../controllers/locationController.js';
import { updateLocationController } from '../controllers/locationController.js';


const router = express.Router();

router.post('/', createLocationController);
router.get('/', getLocationsController);
router.get('/:id', getASingleLocationByIdController);
router.put('/:id', updateLocationController);


export default router;