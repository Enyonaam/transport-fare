import express from 'express';
import { getUsersController, getASingleUserByIdController } from '../controllers/userController.js';
import {updateUserController} from '../controllers/userController.js';
import { deleteUserController } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsersController);
router.get('/:id', getASingleUserByIdController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;