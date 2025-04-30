import { Message } from "../models/message.Model.js";

export const postMessages = async (req,res) => {
    try{
        const { requestemail, donoremail, word } = req.body;

        if(!requestemail){
            return res.status(400).json({
                message : "Something Error",
            })
        };

        const data = await Message.findOne({ email });

        if(!data){
            return res.status(400).json({
                message : "Data not there"
            })
        };

        const newMessage = await Message({
            donoremail : donoremail,
            requestemail : requestemail,
            word : word,
        });

        await newMessage.save();

        return res.status(200).json({
            message : "All Messages Sent",
            data : newMessage
        });
    }catch(error){
        console.error("Error posting message:", error);
        res.status(500).json({
            message: "An error occurred while posting messages",
            status: 0,
            error: error.message,
        });
    }
}