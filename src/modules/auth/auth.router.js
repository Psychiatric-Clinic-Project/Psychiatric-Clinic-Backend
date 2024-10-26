import { Router } from "express";
import {  userSignUp, verifyEmail } from "./auth.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";

const router = Router();

router.post("/userSignup", asyncHandler(userSignUp));
router.get("/verify-email/:token", asyncHandler(verifyEmail));

export default router;