import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
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
    password:
    {
        type: String,
        required: true
    },
    linkedin: String,
},
{
    timestamps: true
})

export const User = mongoose.models?.User || mongoose.model('User', userSchema)