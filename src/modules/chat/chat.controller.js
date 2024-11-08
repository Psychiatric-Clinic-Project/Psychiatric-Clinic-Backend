import chatModel from "../../../Database/models/chat.model.js";
import messageModel from "../../../Database/models/message.model.js";
import participantModel from "../../../Database/models/participant .model.js";
import {
  createdSuccessfullyMessage,
  deletedSuccessfullyMessage,
  mapToOriginId,
  notFoundMessage,
  retrievedSuccessfullyMessage,
} from "../../utils/index.js";

export const createNewChat = async (req, res) => {
  const { isGroup, chatName, participantIds } = req.body;
  let chat;
  if (isGroup) {
   const adminId = await participantModel
      .find(mapToOriginId(req.user.role, req.user._id))
      .select("_id");
    if (!adminId) {
      return res.error(notFoundMessage("Participant"), 404);
    }
    chat = await chatModel.create({
      participantIds,
      groupAdmin: adminId[0]._id,
      isGroup,
      chatName,
    });
  } else {
    chat = await chatModel.create({
      participantIds,
    });
  }
  return res.success(chat, createdSuccessfullyMessage("Chat"), 201);
};

export const sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { content } = req.body;
  const participantId = await participantModel
    .find(mapToOriginId(req.user.role, req.user._id))
    .select("_id");
  const message = await messageModel.create({
    chatId,
    sender: participantId,
    content,
  });
  return res.success(message, createdSuccessfullyMessage("Message"), 201);
};

export const retrieveChats = async (req,res) => {
  const participantId = await participantModel
    .find(mapToOriginId(req.user.role, req.user._id))
    .select("_id");

  const chats = await chatModel
    .find({
      participantIds: { $in: [participantId] },
    })
    .populate("participantIds groupAdmin");

  return res.success(chats, retrievedSuccessfullyMessage("Chats"), 200);
};

export const retriveMessagesForChat = async (req,res) => {
  const { chatId } = req.params;
  const messages = await messageModel
    .find({
      chatId,
    })
    .populate("sender");

  return res.success(messages, retrievedSuccessfullyMessage("Messages"), 200);
};

export const leaveChat = async (req, res) => {
    const { chatId } = req.params;
    const participantId = await participantModel
     .find(mapToOriginId(req.user.role, req.user._id))
     .select("_id");
    const chat = await chatModel.findByIdAndUpdate(
      chatId,
      { $pull: { participantIds: participantId[0]._id } },
      { new: true }
    );
    if (!chat) {
      return res.error(notFoundMessage("Chat"), 404);
    }
    return res.success(chat, "chat left successfully", 200);
}

export const deleteChat = async (req, res) => {
    const { chatId } = req.params;
    const chat = await chatModel.findByIdAndDelete(chatId);
    if (!chat) {
      return res.error(notFoundMessage("Chat"), 404);
    }
    return res.success(chat, deletedSuccessfullyMessage("Chat"), 200);
}

export const deleteMessage = async (req, res) => {
    const { messageId } = req.params;
    const message = await messageModel.findByIdAndDelete(messageId);
    if (!message) {
      return res.error(notFoundMessage("Message"), 404);
    }
    return res.success(message, deletedSuccessfullyMessage("Message"), 200);
}

export const createMessage = async(req,res)=>{
    const { chatId, content } = req.body;
    const participantId = await participantModel
     .find(mapToOriginId(req.user.role, req.user._id))
     .select("_id");
    const message = await messageModel.create({
      chatId,
      sender: participantId[0]._id,
      content,
    });
    return res.success(message, createdSuccessfullyMessage("Message"), 201);
}
