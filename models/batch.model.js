import mongoose, { Schema } from "mongoose";

const batchSchema = new Schema(
    {
        title: 
        { 
            type: String
        },
        course:
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        },
        enrollments:
        [{
            type: Schema.Types.ObjectId,
            ref: 'Enrollment'
        }],
        status:
        {
            type: String,
            enum: ['Upcoming', 'Ongoing', 'Completed'],
            default : 'Upcoming'
        },
        sessions:
        [{
            type: Schema.Types.ObjectId,
            ref: 'Session'
        }],
        mentor: 
        {
            type: Schema.Types.ObjectId,
            ref: 'Mentor'
        },
        zoomLink:
        {
            type: String,
        },
        whatsappLink:
        {
            type: String,
        },
        startDate:
        {
            type: Date
        },
        endDate:
        {
            type: Date
        }
    },
    {
        timestamps: true
    }
)

export const Batch = mongoose.models?.Batch || mongoose.model('Batch', batchSchema) 