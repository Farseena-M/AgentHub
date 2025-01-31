import express from 'express';
import { distributeTasks, getDistributedTasks } from '../controllers/agentController';
// import { verifyToken } from '../middlewares/verifyToken';
const agentRouter = express.Router();

agentRouter.post('/distribute', distributeTasks);
agentRouter.get('/tasks', getDistributedTasks);

export default agentRouter;
