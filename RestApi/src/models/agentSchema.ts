import mongoose from "mongoose";
import { IAgent } from "../interface/agentInterface";

const agentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true },
    password: { type: String, required: true },
}, { timestamps: true })

export const Agent = mongoose.model<IAgent>('Agent', agentSchema)