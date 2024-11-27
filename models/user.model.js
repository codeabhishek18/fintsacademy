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
    password: 
    {
        type: String
    },
    phone:
    {
        type: Number
    },
    enrollments: 
    [{
        type: Schema.Types.ObjectId,
        ref: 'Enrollment'
    }],
    chats:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'    
    }],
    role:
    {
        type: String,
        enum: ['visitor', 'user', 'mentor', 'admin'],
        default: 'visitor'
    },
    status:
    {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    googleId: String,
    imageURL: String,
    linkedin: String,
},
{
    timestamps: true
})

export const User = mongoose.models?.User || mongoose.model('User', userSchema);