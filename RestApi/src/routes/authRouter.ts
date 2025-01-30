import express from 'express';
import { addAgent, loginUser, registerUser } from '../controllers/userController';
const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/create-agent', addAgent);

export default authRouter
