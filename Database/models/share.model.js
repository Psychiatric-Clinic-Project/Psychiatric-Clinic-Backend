import { model, Schema, Types } from "mongoose";

const shareSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User', required: true
    },
    postId: {
        type: Types.ObjectId,
        ref: 'Post',
        required: true
    },
    
}, { timestamps: true });

const Share = model("Share", shareSchema);

export default Share;