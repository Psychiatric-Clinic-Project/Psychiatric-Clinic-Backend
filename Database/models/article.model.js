import { model, Schema } from "mongoose";

const articleSchema = new Schema(
  {
    
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    img: {
      type: String, 
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const articleModel = model("Article", articleSchema);
