import express from "express";
import { bloodRequest, getAllRequests } from "../controllers/requestBlood.Controller.js";

const requestRouter = express.Router();

requestRouter.post("/postrequest",bloodRequest);
requestRouter.get("/getrequest",getAllRequests);

export default requestRouter;