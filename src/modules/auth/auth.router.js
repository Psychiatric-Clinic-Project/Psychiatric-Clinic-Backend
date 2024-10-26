import { Router } from "express";
import { userSignUp, verifyEmail } from "./auth.controller.js";

const router = Router();

router.post("/userSignup", userSignUp);
router.get("/verifyEmail", verifyEmail);


export default router;