import mongoose from "mongoose";

const application = mongoose.Schema({
    name : { type : String, required : true },
    dob : { type : String, required : true },
    gender : { type : String, required : true },
    bloodgroup : { type : String, required : true },
    email : { type : String, required : true },
    phoneno : { type : Number, required : true },
    address : { type : String, required : true },
    city : { type : String, required : true },
    state : { type : String, required : true },
    pincode : { type : Number, required : true },
    weight : { type : Number , required : true },
    height : { type : Number , required : true },
    lblooddonate : { type : String , required : true },
    platelets : { type : String, required : true },
    socialize : { type : String, required : true },
    typeofdonar : { type : String, required : true },
    requestorEmail : { type : String, required : true },
    message : { type : String , required : true },
})

export const Application = mongoose.model("Application",application);