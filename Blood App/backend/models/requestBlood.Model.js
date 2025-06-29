import mongoose from "mongoose";

const requestBlood = mongoose.Schema({
    name : { type : String, required : true },
    gender : { type : String, required : true },
    email : { type : String, required : true },
    phoneno : { type : String, required : true },
    address : { type : String, required : true },
    date : { type : String, required : true },
    platelets : { type : String, required : true },
    donorEmail : { type : String, required : true },
    units : { type : Number, required : true },
    urgencylevel : { type : String, required : true },
})

export const BloodApplication = mongoose.model("BloodApplication",requestBlood);