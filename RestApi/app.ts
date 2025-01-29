import express from 'express';
import cors from 'cors';
import authRouter from './src/routes/authRouter';
import agentRouter from './src/routes/agentRouter';


const app = express()

app.use(express.json())
app.use(cors());


app.use('/user', authRouter)
app.use('/agent', agentRouter)


export default app