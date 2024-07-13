//require ('dotenv').config()
import connectToDB from "./db/db.js";
import dotenv from "dotenv"
import { app } from "./app.js"

dotenv.config({
    path:'./.env'
})

connectToDB()
.then((result) => {
    //let error = "app is not listening"
    //throw error
    app.on("error", (error) => {
        console.log("Error in express", error)
        throw error
    })
    app.listen(process.env.PORT, () => {
        console.log("Server is listening on PORT: ", process.env.PORT)
    })
})
.catch((error) => console.log("Error while connecting to app", error))

//console.log(app)  
//console.log(app.route)
//console.log(app._router.stack) - so, all this is being imported and used, okay - lets create the seller routes in app.js

//So the app is working
app.get("/", (req,res) => {
    res.send("hey there i am the e-commerce backend")
})
//console.log(app._router);
//console.log("what did we get");

//console.log("le aao seller ko")