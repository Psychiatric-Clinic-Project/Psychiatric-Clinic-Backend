import { model, Schema, Types } from "mongoose";
import { STATUS_TYPES } from "../../src/constant.js";

const supportSchema = new Schema(
  {
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
      request: {
        type: String,
        required: true,
      },
      response: {
        type: String,
        required: false,
      },
      status: {
        type: String,
        enum: STATUS_TYPES,
        default: "In proccess",
      } 
  },
  {
    timestamps: true,
  }
);
const supportModel = model("Support", supportSchema);

export default supportModel;
