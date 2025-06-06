import express from "express";
import { getAllApplications, getApplication, getRequestor, postApplication, updateLbloodDate, updateMessage, updateProfile, updateSocialize } from "../controllers/application.Controller.js";

const approuter = express.Router();
approuter.post("/postdetails",postApplication);
approuter.get("/getdetails",getApplication);
approuter.get("/getalldetails",getAllApplications);
approuter.put("/updateSocialize",updateSocialize);
approuter.put("/updateMessage", updateMessage);
approuter.get("/getRequestor", getRequestor);
approuter.put("/updateprofile",updateProfile);
approuter.put("/updatedate",updateLbloodDate);
export default approuter;