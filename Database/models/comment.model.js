import { model, Schema, Types } from "mongoose";

const commentSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User', required: true
    },
    postId:
    {
        type: Types.ObjectId,
        ref: 'Post',
        required: true
    },
    text: String,
    image: String,
    unlike: [{ type: Types.ObjectId, ref: "User" }],
    likes: [{ type: Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const Comment = model("Comment", commentSchema);

export default Comment;