import express from 'express';

import { createLocationController } from '../controllers/locationController.js';


const router = express.Router();

router.post('/', createLocationController);



export default router;