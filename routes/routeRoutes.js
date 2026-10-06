import express from 'express';

import { createRouteController } from '../controllers/routeController.js';

const router = express.Router();

router.post('/', createRouteController);

export default router;