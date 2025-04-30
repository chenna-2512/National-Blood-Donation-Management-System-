import mongoose from "mongoose";

const message = mongoose.Schema({
    donoremail : { type : String , required : true },
    requestemail : { type : String , required : true },
    word : { type : String, required : true},
});

export const Message = mongoose.model("Message",message)