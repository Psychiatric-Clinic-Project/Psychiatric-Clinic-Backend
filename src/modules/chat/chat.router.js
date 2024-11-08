import { Router } from "express";
import { asyncHandler } from "../../middleWare/asyncHandler.js";
import { createNewChat } from "./chat.controller.js";
import { ROLES } from "../../constant.js";
import { auth } from "../../middleWare/auth.js";
const router = Router();
router.use(auth([ROLES.advisor,ROLES.user,ROLES.coach]));
router.post('/create-chat',asyncHandler(createNewChat))


export default router;