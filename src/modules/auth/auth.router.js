import { Router } from "express";
import { advisorSignUp, signIn ,userSignUp,verifyEmail} from "./auth.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";


const router = Router();

router.post("/user-signup", asyncHandler(userSignUp));
router.post("/advisor-signup", asyncHandler(advisorSignUp));
router.get("/verify-email/:token", asyncHandler(verifyEmail));
router.post("/signin",asyncHandler(signIn))

export default router;