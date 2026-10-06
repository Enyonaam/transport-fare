import express from 'express';

import { createFareController } from '../controllers/fareController.js';
import { getFaresController, getASingleFareByIdController } from '../controllers/fareController.js';
import { updateFareController } from '../controllers/fareController.js';

const router = express.Router();

router.post('/', createFareController);
router.get('/', getFaresController);
router.get('/:id', getASingleFareByIdController);
router.put('/:id', updateFareController);


export default router;