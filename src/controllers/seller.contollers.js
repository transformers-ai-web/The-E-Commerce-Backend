import { Seller } from "../models/seller.models.js"
import { CustomApiError } from "../utils/ApiError.js"
import { CustomApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


//I want to register a seller first - so we would need the model first, make that and come back.
//Alright, I have made the basic model
//Some other functionalities i can think of is, sending a success email to the seller, onboarding them


const registerSeller = asyncHandler(async (req, res) => {
    // how do we register a seller?
    // get the data from frontend first - it could be empty - check for null
    // now create a document( mongodb terminology ) of type seller and save it in the database
    // after successful saving - send a mail to user, send success code to frontend - so seller could be redirected to dashboard
    // console.log("Can we register a seller?");
    // res.send("hello there");
    
    //console.log(Seller.methods)
    const { seller_name, seller_email, seller_password, seller_address, seller_phoneNo } = req.body
    //console.log(seller_name, seller_email, seller_password, seller_address, seller_phoneNo);

    //so, .some returns true, if any of the array element passes the some's callback condition
    //.trim() - just to make data cleaner - removing whitespaces around the data
    // will there be a need for optional chaining?

    //ab samajh mein aya beta optional chaining q chahiye?? .trim() undefined ki propertied pd nhi skta, to code crash kr jayega
    //iska mtlb .trim lgega he tb jb data h - simple
    if([seller_name, seller_email, seller_password, seller_address, seller_phoneNo].some((field) => field?.trim() === "" || field === undefined)){
        throw new CustomApiError(400, "All fields are required")
    }
    //res.send("Got all the fields")

    const allData = await Seller.find();
    //console.log(allData);

    const ifAlreadyExist = await Seller.findOne({seller_name, seller_email})//here i can also use mongoose operators
    //console.log(ifAlreadyExist)

    //res.send("Got all the fields")
    if(ifAlreadyExist){
        throw new CustomApiError(400, "This user already exists, please provide unique credentials")
    }
    

    const seller = await Seller.create({
            seller_name,
            seller_email,
            seller_password,
            seller_address,
            seller_phoneNo
    })

    //check whether the seller was created.
    const userCreated = await Seller.find(Seller._id).select("-seller_password")

    if(!userCreated)
        throw new CustomApiError(500, "Error while registering the user")



    return res.status(200).json( new CustomApiResponse(200, "Seller registered successfully", userCreated) )

    
})

const loginSeller = asyncHandler(async (req,res) => {
    //console.log("Trying to log in, give the details.")
    //now seller might give the email or name - how to fetch them? 
    const {seller_email, seller_password} = req.body
    if (!(seller_email || seller_password))
        throw new CustomApiError(400, "Both the fields are required")

    const seller = await Seller.findOne({seller_email})

    if(!seller)
        throw new CustomApiError(400, "This email does not exist")

    const matchPassword = await seller.isPasswordCorrect(seller_password)

    if(!matchPassword)
        throw new CustomApiError(400, "Password is wrong")


    res.status(200).send(new CustomApiResponse(201, "logged in successfully"))
})

//forgot password functionality
const forgotPassword = asyncHandler( async(req, res) => {
    console.log("forgot password functionality")
    
    const { seller_email } = req.body;
    console.log(seller_email)
    if(seller_email == "")
        throw new CustomApiError(400, "Email is required to reset the password")

    res.status(200).send(new CustomApiResponse(201, "password changed successfully"))
})

export { registerSeller, loginSeller, forgotPassword }