import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    sender: 
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text:
    {
        type: String,
        required: true
    }
},{timestamps: true})

export const Message = mongoose.models?.Message || mongoose.model('Message', messageSchema)