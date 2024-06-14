//require ('dotenv').config()
import connectToDB from "./db/db.js";
import dotenv from "dotenv"

dotenv.config({
    path:'./.env'
})

connectToDB()
console.log("le aao seller ko")