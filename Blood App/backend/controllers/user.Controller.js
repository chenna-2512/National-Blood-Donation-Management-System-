import bcrypt from "bcryptjs";
import { User } from "../models/email.Model.js"

export const postEmail = async(req,res) => {
    try{
        const {  email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (user) {
        return res.status(400).json({
            message: "User already exists",
            status: 0,
        });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email: email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({
            message: "User Registered Successfully",
            status: 1,
        });

  } catch (err) {
        console.error("Error in user registration:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};
