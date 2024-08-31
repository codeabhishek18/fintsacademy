import mongoose, { Schema } from "mongoose";

const mentorSchema = new Schema({
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
    phone: Number,
    imageURL: String,
    about: String,
    experience: String,
    linkedin: String,
},
{
    timestamps: true
})

export const Mentor = mongoose.models?.Mentor || mongoose.model('Mentor', mentorSchema)