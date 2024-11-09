import { model, Schema, Types } from "mongoose";
import { USER_CATEGORY } from "../../src/constant.js";

const postSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes:
    {
        type: Number,
        default: 0
    },
    unlikes:
    {
        type: Number,
        default: 0
    },
    text: String,
    image: String,
    category: USER_CATEGORY,
    shares: 
    {
        type: Number,
        default: 0
    },
}, { timestamps: true });

const Post = model("Post", postSchema);

export default Post;