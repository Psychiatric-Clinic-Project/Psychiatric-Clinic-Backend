import chatModel from "../../../Database/models/chat.model.js";
import messageModel from "../../../Database/models/message.model.js";
import participantModel from "../../../Database/models/participant .model.js";
import {
  createdSuccessfullyMessage,
  mapToOriginId,
  notFoundMessage,
  retrievedSuccessfullyMessage,
} from "../../utils/index.js";

export const createNewChat = async (req, res) => {
  const { isGroup, chatName, participantIds } = req.body;
  let chat;
  if (isGroup) {
    adminId = await participantModel
      .find(mapToOriginId(req.user.role, req.user._id))
      .select("_id");
    if (!adminId) {
      return res.error(notFoundMessage("Participant"), 404);
    }
    chat = await chatModel.create({
      participantIds,
      groupAdmin: adminId,
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

export const retrieveChats = async () => {
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

export const retriveMessagesForChat = async () => {
  const { chatId } = req.params;
  const messages = await messageModel
    .find({
      chatId,
    })
    .populate("sender");

  return res.success(messages, retrievedSuccessfullyMessage("Messages"), 200);
};
