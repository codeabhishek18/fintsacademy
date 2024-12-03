
import { Assignment } from "@/models/assignment.model";
import { Batch } from "@/models/batch.model";
import { Course } from "@/models/course.model";
import { Group } from "@/models/group.model";
import { Quiz } from "@/models/quiz.model";
import { Test } from "@/models/test.model";

class quizService
{
    async createQuiz(title, course, quiz)
    {
        try
        {
            const newQuiz = await Quiz.create({title, course, quiz});
            return await newQuiz.save();
        }
        catch(error)
        {
            throw error
        }
    }

    async getAllQuizzes()
    {
        try
        {
            const quizzes = await Quiz.find()
            .populate({path: 'course', model: Course})
            .populate({
                path: 'groups',
                model: Group,
                populate:
                [{
                    path: 'batch',
                    model: Batch,
                },
                {
                    path: 'tests',
                    model: Test
                }]
            })
            
            return quizzes
        }
        catch(error)
        {
            throw error
        }
    }

    async getQuizById(id)
    {
        try
        {
            const quiz = await Quiz.findById(id)
            .populate({
                path: 'groups',
                model: Group,
                populate:
                [{
                    path: 'batch',
                    model: Batch,
                    populate:
                    {
                        path: 'course',
                        model: Course
                    }
                },
                {
                    path: 'tests',
                    model: Test
                }]
            })
            return quiz
        }
        catch(error)
        {
            throw error
        }
    }

    async getQuizByTitle(id)
    {
        try
        {
            const quiz = await Quiz.findOne({title: id})
            .populate({
                path: 'groups',
                model: Group,
                populate:
                [{
                    path: 'batch',
                    model: Batch,
                    populate:
                    {
                        path: 'course',
                        model: Course
                    }
                },
                {
                    path: 'tests',
                    model: Test
                }]
            })
            return quiz
        }
        catch(error)
        {
            throw error
        }
    }

    async findQuizByBatch(batchId)
    {
        try
        {
            console.log(batchId)
            const quiz = await Quiz.find()
            .populate({path: 'group', model: Group, populate: {
                path: 'batch', model: Batch, match: {_id: batchId}
            }});

            return quiz
        }
        catch(error)
        {
            console.log(error.message)
            throw error
        }
    }

    async updateGroup(quizId, group)
    {
        try
        {
            return await Quiz.findByIdAndUpdate(quizId, {$push: {groups: group}});
        }
        catch(error)
        {
            return error
        }
    }
}

export default quizService