import { Router } from "express";
import { coachSignUp, signIn } from "./auth.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";
import {  userSignUp, verifyEmail } from "./auth.controller.js";

const router = Router();

router.post("/user-signup", asyncHandler(userSignUp));
router.post("/coach-signup", asyncHandler(coachSignUp));
router.get("/verify-email/:token", asyncHandler(verifyEmail));
router.post("/signin",asyncHandler(signIn))

export default router;