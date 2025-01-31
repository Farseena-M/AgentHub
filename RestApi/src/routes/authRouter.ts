import express from 'express';
import { addAgent, loginUser, registerUser } from '../controllers/userController';
import { verifyToken } from '../middlewares/verifyToken';
const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/create-agent', verifyToken, addAgent);

export default authRouter
