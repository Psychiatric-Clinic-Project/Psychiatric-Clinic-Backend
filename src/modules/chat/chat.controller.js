import chatModel from "../../../Database/models/chat.model.js";
import messageModel from "../../../Database/models/message.model.js";
import participantModel from "../../../Database/models/participant .model.js";
import { createdSuccessfullyMessage, getAdditionalParticipants } from "../../utils/index.js";


export const createNewChat = async (req, res) => {
    const { groupAdmin, isGroup, chatName, participantIds } = req.body;
    const authenticatedUserId = req.user._id; 
    const additionalParticipants = await getAdditionalParticipants(authenticatedUserId, participantIds);
    const totalParticipants = [authenticatedUserId, ...additionalParticipants];
    const participants = await participantModel.find({ _id: { $in: totalParticipants } });
    const admin = await participantModel.findById(groupAdmin);
    if (!admin) {
        return res.error("Invalid groupAdmin ID", 400);
    }
    const chat = await chatModel.create({
        participantIds: totalParticipants,
        groupAdmin,
        isGroup,
        chatName,
    });
    return res.success(chat, createdSuccessfullyMessage("Chat"), 201);

};


export const sendMessage = async (req, res) => {
    const { chatId } = req.params;
    const { sender, content } = req.body;
    const message = await messageModel.create({ chatId, sender, content });
    await chatModel.findByIdAndUpdate(chatId, { latestMessage: message._id });

    res.status(201).json(message);
}