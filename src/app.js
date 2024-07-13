import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
// read more about cors, cookie-parser, express.static aka public dir, 


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

//configuring the response that is its size as of now - both for json data and url data(params)
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))// extended allows for passing nested objects

app.use(express.static("public"))
app.use(cookieParser())

app.get("/ecomm", (req,res) => {
    res.send("why routes declared in app.js are working, when index.js is my main entry file, because i am importing it?")
})  //because index is importing the app object - woah this is really powerful

import sellerRouter from "../src/routes/seller.routes.js"

app.use("/api/v1/seller", sellerRouter)

export { app }