import { Router } from "express";
import { getSupportRequest, requestSupport,cancelUserSession, getSessions, selectSession } from "./user.controller.js";
import { asyncHandler } from "../../middleWare/asyncHandler.js";
import { auth } from "../../middleWare/auth.js";
import { ROLES } from "../../constant.js";

const router = Router();
router.use(auth([ROLES.user]))

router.post("/request-support" ,asyncHandler(requestSupport));
router.get("/support-request", asyncHandler(getSupportRequest));
router.put("/select-session/:id", asyncHandler(selectSession))
router.get("/sessions", asyncHandler(getSessions))
router.put("/cancel-session/:id",asyncHandler(cancelUserSession))

export default router;