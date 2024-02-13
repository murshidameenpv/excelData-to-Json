import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
const mongodb_url = process.env.MONGODB_URL;
// console.log(mongodb_url);

const connectDb = async () => {
    try {
        await mongoose.connect(mongodb_url)
        console.log(`Mongodb is connected`)
    } catch (error) {
        console.error(error);
    }
}
connectDb()