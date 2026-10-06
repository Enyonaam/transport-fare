import express from 'express';

import { createRouteController } from '../controllers/routeController.js';
import { getRoutesController, getASingleRouteByIdController } from '../controllers/routeController.js';
import { updateRouteController } from '../controllers/routeController.js';


const router = express.Router();

router.post('/', createRouteController);
router.get('/', getRoutesController);
router.get('/:id', getASingleRouteByIdController);
router.put('/:id', updateRouteController);


export default router;