import mongoose, { Document } from 'mongoose';

export interface ITask extends Document {
    agentId: mongoose.Schema.Types.ObjectId;
    firstName: string;
    phone: number;
    notes: string;
}