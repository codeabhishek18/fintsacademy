import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema({
    user:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    batch:
    {
        type: Schema.Types.ObjectId,
        ref: 'Batch'
    },
    assessments:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Test'
    }]
})

export const Enrollment = mongoose.models?.Enrollment || mongoose.model('Enrollment', enrollmentSchema)