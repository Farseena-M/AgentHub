import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import authRouter from './src/routes/authRouter';
import agentRouter from './src/routes/agentRouter';


const app = express()

app.use(express.json())
app.use(cors());


app.use('/user', authRouter)
app.use('/agent', agentRouter)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: err.message || 'An unexpected error occurred' });
});


export default app