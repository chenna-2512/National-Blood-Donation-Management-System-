import { User } from "../models/email.Model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const loginVerify = async (req,res) => {
    try{
        const { email , password } = req.body;
        console.log(email,password)
        if(!email || !password){
            return res.status(400).json({
                message : "Missing Credentials"
            })
        }


        const userEmail = await User.findOne({email});
        console.log(userEmail);
        if(!userEmail){
            return res.status(400).json({
                message : "User not found"
            })
        }


        const CorrectUser = await bcrypt.compare(password, userEmail.password);
        if(!CorrectUser){
            return res.status(400).json({
                message : "Incorrect Password"
            })
        }


        const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
            expiresIn: "60min",
        });
        console.log(token);
        const LoggedUser = {
            email : userEmail.email,
            id : userEmail._id,
            token : token
        }
        return res.status(201).json({
            message : "Loggedin Successfully",
            LoggedUser
        })
    }catch(error){
        return res.status(400).json({
            message : "Data not found",
            error,
        })
    }
}