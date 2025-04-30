import express from "express";
import { loginVerify } from "../controllers/login.Controller.js";

const loginRouter = express.Router();

loginRouter.post("/loginuser",loginVerify);

export default loginRouter;