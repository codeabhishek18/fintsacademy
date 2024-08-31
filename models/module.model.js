import mongoose, { Schema } from 'mongoose'

const moduleSchema = new Schema({
    title: 
    {
        type: String,
        required: true
    },
    agenda:
    {
        type: String,
        required: true
    }
},{timestamps: true})

export const Module = mongoose.models?.Module || mongoose.model('Module', moduleSchema)