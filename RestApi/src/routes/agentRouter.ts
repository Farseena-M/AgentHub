import express from 'express';
import { distributeTasks } from '../controllers/agentController';
import { verifyToken } from '../middlewares/verifyToken';
const agentRouter = express.Router();

agentRouter.post('/distribute', verifyToken, distributeTasks);

export default agentRouter;
