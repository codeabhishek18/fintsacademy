import mongoose, { Schema } from "mongoose";

const lectureSchema = new Schema({
    description:
    {
        type: String,
        required: true
    },
    duration:
    {
        type: Number,
        required: true
    }
},{timestamps: true})

export const Lecture = mongoose.models?.Lecture || mongoose.model('Lecture', lectureSchema)