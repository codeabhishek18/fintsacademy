import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema({
    id: 
    {
        type: Number,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    duration: String,
    status:
    {
        type : String,
        enum : ['Upcoming', 'Completed'],
        default: 'Upcoming'
    },
    recording: String
},
{
    timestamps : true
})

export const Session = mongoose.models?.Session || mongoose.model('Session', sessionSchema);

