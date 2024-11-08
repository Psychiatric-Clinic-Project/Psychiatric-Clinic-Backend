import { Router } from "express";
import { asyncHandler } from "../../middleWare/asyncHandler.js";
import { createNewChat, retrieveChats, retriveMessagesForChat } from "./chat.controller.js";
import { ROLES } from "../../constant.js";
import { auth } from "../../middleWare/auth.js";

const router = Router();

router.use(auth([ROLES.advisor,ROLES.user,ROLES.coach]));
router.post('/create-chat',asyncHandler(createNewChat))
router.get('/retrive-chats',asyncHandler(retrieveChats))
router.get('/retrive-messages',asyncHandler(retriveMessagesForChat))

export default router;