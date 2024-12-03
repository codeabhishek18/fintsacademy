import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema({
    batch:
    {
        type: Schema.Types.ObjectId,
        ref: 'Batch'
    },
    tests:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Test'
    }]
    
})

export const Group = mongoose.models?.Group || mongoose.model('Group', groupSchema)