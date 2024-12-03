import mongoose, {Schema} from "mongoose";

const testSchema = new Schema({
    quizDetails:
    {
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    enrollment:
    {
        type: Schema.Types.ObjectId,
        ref: 'Enrollment'   
    },
    answers:
    {
        type: [[Number]]
    },
    status:
    {
        type : String,
        enum : ['Pending', 'Completed'],
        default: 'Pending'
    },
    score: Number,
    takes: Number
},{timestamps: true})

export const Test = mongoose.models?.Test || mongoose.model('Test', testSchema)