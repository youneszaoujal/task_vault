import express from 'express';
import { getAllUsers, createUser, registerUser,loginUser } from '../controller/userController.js';


const router = express.Router();
router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/register', registerUser);
router.post('/login', loginUser);


export default router;