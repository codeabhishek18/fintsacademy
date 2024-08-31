import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
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
    message:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
    
},
{
    timestamps: true
}
)

export const Chat = mongoose.models?.Chat || mongoose.model('Chat', chatSchema);
