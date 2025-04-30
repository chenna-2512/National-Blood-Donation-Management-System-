import dotenv from "dotenv";
import express from "express";
import router from "./routers/userRouter.js";
import mongoose from "mongoose";
import cors from "cors";
import loginRouter from "./routers/loginRouter.js";
import approuter from "./routers/applicationRouter.js";
import requestRouter from "./routers/requestBloodRouter.js";
import messagerouter from "./routers/messageRouter.js";


dotenv.config();

const app = express();
app.use(express.json());

const url = process.env.MONGO_URL;
if (!url) {
  console.error("MONGO_URL is missing in .env file!");
  process.exit(1);
}

console.log("MongoDB URL:", url); 

mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); 
  });

app.use(cors());
app.use(express.json());  
app.use(router);
app.use(loginRouter);
app.use(approuter);
app.use(requestRouter);
app.use(messagerouter);

app.listen(3002, () => {
    console.log("Server is running on http://localhost:3002");
}); 