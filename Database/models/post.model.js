import { model, Schema, Types } from "mongoose";
import { USER_CATEGORY } from "../../src/constant.js";

const postSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{ type: Types.ObjectId, ref: "User" }],
    unlikes: [{ type: Types.ObjectId, ref: "User" }],
    text: String,
    image: Array,
    category: USER_CATEGORY,
    shares:  [{ type: Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const Post = model("Post", postSchema);

export default Post;