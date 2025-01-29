import mongoose from "mongoose";
import { IUser } from "../interface/userInterface";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true })

export const User = mongoose.model<IUser>('User', userSchema)