import express from 'express';
import { getAllUsers, createUser } from '../controller/userController.js';


const router = express.Router();
router.get('/', getAllUsers);
router.post('/', createUser);

export default router;