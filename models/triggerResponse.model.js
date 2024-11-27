import mongoose, { Schema } from "mongoose";

const triggerResponseSchema = new Schema({
    trigger:
    {
        type: Schema.Types.ObjectId,
        ref: 'Trigger'
    },
    response: String,
    batch:
    {
        type: Schema.Types.ObjectId,
        ref: 'Batch'
    },
    user:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: 
    {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    }
},{ timestamps: true})

export const TriggerResponse = mongoose.models?.TriggerResponse || mongoose.model('TriggerResponse', triggerResponseSchema);