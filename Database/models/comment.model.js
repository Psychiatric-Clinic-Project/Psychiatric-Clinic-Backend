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
    likes: {
        type: Number,
        default: 0
    },
    unlikes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Comment = model("Comment", commentSchema);

export default Comment;