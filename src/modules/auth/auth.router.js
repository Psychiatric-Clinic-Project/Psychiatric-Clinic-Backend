import { Router } from "express";
import { signIn } from "./auth.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";
import {  userSignUp, verifyEmail } from "./auth.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";

const router = Router();

router.post("/userSignup", asyncHandler(userSignUp));
router.get("/verify-email/:token", asyncHandler(verifyEmail));
router.post("/signin",asyncHandler(signIn))

export default router;