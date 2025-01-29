import dotenv from "dotenv";
dotenv.config()
import { connectDB } from "./src/db/dbConnect";
import app from "./app";

connectDB()

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})