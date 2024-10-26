import { model, Schema } from "mongoose";

const adminSchema = new Schema(
    {
        name:{
            type: String,
            required: true

        },
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        img:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const adminModel = model("Admin", adminSchema);