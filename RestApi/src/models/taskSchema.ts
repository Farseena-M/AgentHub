import mongoose from 'mongoose';
import { ITask } from '../interface/taskInterface';

const taskSchema = new mongoose.Schema({
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
    firstName: { type: String, required: true },
    phone: { type: Number, required: true },
    notes: { type: String, required: true },
}, { timestamps: true });

export const Task = mongoose.model<ITask>('Task', taskSchema);
