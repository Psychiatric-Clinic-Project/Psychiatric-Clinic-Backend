import { Router } from "express";
import { asyncHandler } from "../../middleWare/asyncHandler.js";
import { createMessage, createNewChat, deleteChat, deleteMessage, leaveChat, retrieveChats, retriveMessagesForChat } from "./chat.controller.js";
import { ROLES } from "../../constant.js";
import { auth } from "../../middleWare/auth.js";

const router = Router();

router.use(auth([ROLES.advisor,ROLES.user,ROLES.coach]));
router.post('/create-chat',asyncHandler(createNewChat))
router.get('/retrive-chats',asyncHandler(retrieveChats))
router.get('/retrive-messages',asyncHandler(retriveMessagesForChat))
router.patch('/leave-chat/:chatId',asyncHandler(leaveChat))
router.delete('/delete-chat/:chatId',asyncHandler(deleteChat))
router.delete('/delete-message/:messageId',asyncHandler(deleteMessage))
router.post('/create-message',asyncHandler(createMessage))

export default router;