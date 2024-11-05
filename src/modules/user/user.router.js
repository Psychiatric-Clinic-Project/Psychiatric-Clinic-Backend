import { Router } from "express";
import { getSupportRequest, requestSupport } from "./user.controllrt.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";
import { auth } from "../../middleWare/auth.js";
import { ROLES } from "../../constant.js";

const router = Router();
router.use(auth([ROLES.user]))

router.post("/request-support" ,asyncHandler(requestSupport));
router.get("/support-request", asyncHandler(getSupportRequest));

export default router;