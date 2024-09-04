import mongoose, { Schema } from "mongoose";

const assignmentSchema = new Schema(
    {
        user:
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        test:
        {
            type: Schema.Types.ObjectId,
            ref: 'Test'
        }
    },
    {
        timestamps: true
    }
)

export const Assignment = mongoose.models?.Assignment || mongoose.model('Assignment', assignmentSchema) 