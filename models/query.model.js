import mongoose, { Schema } from "mongoose";

const querySchema = new Schema({
    name:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    query:
    {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

export const Query = mongoose.models?.Query || mongoose.model('Query', querySchema)