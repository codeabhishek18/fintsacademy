import mongoose, { Schema } from "mongoose";

const replySchema = new Schema({
    author:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reply:
    {
        type: String
    },
    like:
    {
        type: Number
    }
},{timestamps: true})

export const Reply = mongoose.models?.Reply || mongoose.model('Reply', replySchema)