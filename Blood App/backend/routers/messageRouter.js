import express from "express";
import { postMessages } from "../controllers/message.Controller.js";

const messagerouter = express.Router();

messagerouter.post("/postmessages",postMessages);

export default messagerouter;