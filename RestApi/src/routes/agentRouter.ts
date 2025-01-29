import express from 'express';
import { distributeTasks } from '../controllers/agentController';
const agentRouter = express.Router();

agentRouter.post('/distribute', distributeTasks);

export default agentRouter;
