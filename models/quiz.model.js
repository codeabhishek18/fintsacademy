import mongoose, {Schema} from "mongoose";

const quizSchema = new Schema({
    title:
    {
        type: String
    },
    course:
    {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    quiz:
    {
        type: [Schema.Types.Mixed]
    },
    groups:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }]
},{timestamps: true})

export const Quiz = mongoose.models?.Quiz || mongoose.model('Quiz', quizSchema)