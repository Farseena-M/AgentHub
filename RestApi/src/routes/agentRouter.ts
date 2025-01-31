import express from 'express';
import { distributeTasks, getDistributedTasks } from '../controllers/agentController';
import { verifyToken } from '../middlewares/verifyToken';
const agentRouter = express.Router();

agentRouter.post('/distribute', verifyToken, distributeTasks);
agentRouter.get('/tasks', verifyToken, getDistributedTasks);

export default agentRouter;
