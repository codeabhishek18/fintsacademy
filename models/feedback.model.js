import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema({
    rating:
    {
        type: Number,
        required: true
    },
    comment:
    {
        type: String,
        required: true
    }
},{timestamps: true})

export const Feedback = mongoose.models?.Feedback || mongoose.model('Feedback', feedbackSchema)