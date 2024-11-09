import { model, Schema, Types } from "mongoose";

const chatSchema = new Schema(
  {
    participantIds: [
      {
        type: Types.ObjectId,
        ref: 'Participant',
      },
    ],
    groupAdmin: {
      type: Types.ObjectId,
      ref: 'Participant',
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    chatName: {
      type: String,
      required: function () {
        return this.isGroup; // chatName is required if it's a group chat
      },
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = model("Chat", chatSchema);

export default chatModel;
