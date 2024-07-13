import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"

const sellerSchema = new Schema({
    seller_name :{
        required : true,
        type: String,
        unique: true
    },
    seller_email : {
        required : true,
        type : String,
        unique:true
    },
    seller_password : {
        required : true,
        type : String
    },
    seller_address : {
        required : true,
        type : String
    },
    seller_phoneNo : {
        required : true,
        type : Number
    }

}, {timestamps : true})

//in first creation yes, product addition capability is not being defined 
// so right now , my password is being stored as it is in the database - let's make the basic functionality and then we will add other security layers

//now lets encrypt the password
sellerSchema.pre("save", async function(next){
    if(!this.isModified("seller_password")) return next();

    this.seller_password = await bcrypt.hash(this.seller_password, 10)
})

//lets login the user and check for password validation
sellerSchema.methods.isPasswordCorrect = async function(seller_password){
    return await bcrypt.compare(seller_password, this.seller_password)
}

export const Seller = mongoose.model("Seller", sellerSchema)