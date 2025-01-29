import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
import path from 'path';


dotenv.config({ path: path.join(__dirname, '.env') })


export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.LOCAL_URL as string, { dbName: `agentHub` });
        console.log(`DB connected`);
    } catch (error) {
        console.log(error);
    }
};
