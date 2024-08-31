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
    batch: 
    [{
        type: Schema.Types.ObjectId,
        ref: 'Batch'
    }],
    chat:
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
    assessment:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Test'
    }],
    googleId: String
},
{
    timestamps: true
})

export const User = mongoose.models?.User || mongoose.model('User', userSchema);