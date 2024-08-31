import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    author:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment:
    {
        type: String
    },
    like:
    {
        type: Number
    },
    replies:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Reply'
    }]
},{timestamps: true})

export const Comment = mongoose.models?.Comment || mongoose.model('Comment', commentSchema)