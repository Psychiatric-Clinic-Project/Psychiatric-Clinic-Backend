import { model, Schema, Types } from "mongoose";

const responseSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User', required: true
    },
    commentId: {
        type: Types.ObjectId,
        ref: 'Comment',
        required: true
    },
    text: String,
    image: String,
    likes: [{ type: Types.ObjectId, ref: "User" }],
    unlikes: [{ type: Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const Response = model("Response", responseSchema);

export default Response;