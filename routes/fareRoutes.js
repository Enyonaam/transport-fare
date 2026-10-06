import express from 'express';

import { createFareController } from '../controllers/fareController.js';

const router = express.Router();

router.post('/', createFareController);

export default router;