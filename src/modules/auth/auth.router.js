import { Router } from "express";
import { signIn } from "./auth.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";

const router = Router();

router.post("/signin",asyncHandler(signIn))

export default router;