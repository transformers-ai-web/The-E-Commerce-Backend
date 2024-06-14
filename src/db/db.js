import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`)
        console.log("db connected")
    } catch (error) {
        console.log("Error while connecting to database",error)
        process.exit(1)
    }
}


export default connectToDB