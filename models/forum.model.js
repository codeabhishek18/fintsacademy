import mongoose, { Schema } from "mongoose";

const forumSchema = new Schema({
    title:
    {
        type: String,
        required: true
    },
    author:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    like:
    {
        type: Number
    },
    keywords:
    [{
        type: String
    }]
},{timestamps: true})

export const Forum = mongoose.models?.Forum || mongoose.model('Forum', forumSchema) 