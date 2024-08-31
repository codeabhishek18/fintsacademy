import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema({
    batch:
    {
        type: Schema.Types.ObjectId,
        ref: 'Batch'
    },
    assignment:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
    }]
    
})

export const Group = mongoose.models?.Group || mongoose.model('Group', groupSchema)