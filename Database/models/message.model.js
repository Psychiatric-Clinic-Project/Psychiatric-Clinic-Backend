import { model, Schema, Types } from "mongoose";

const messageSchema = new Schema(
  {
    sender:{
      type:Types.ObjectId,
       ref: 'Participant' ,
    },
    chatId:{
      type: Types.ObjectId,
       ref: 'Chat' ,
    },
    content: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const messageModel = model("Message", messageSchema);

export default messageModel;
