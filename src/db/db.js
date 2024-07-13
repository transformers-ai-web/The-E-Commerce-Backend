import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`)
        console.log("db connected")
    } catch (error) {
        console.log("Error while connecting to database", error)
        process.exit(1)
    }
}


//if i do not handle the error like the below code, then the error will be propagated to the catch in index.js - it can then become confusing, where is the actual error. that is why handle the errors.
// const connectToDB = async () => {
//     const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`)
//     console.log("db connected")
// }


export default connectToDB