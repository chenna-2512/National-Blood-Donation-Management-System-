import express from "express"
import { postEmail } from "../controllers/user.Controller.js";

const router = express.Router();

router.post("/postuser",postEmail);

export default router;