import { Quiz } from "@/models/quiz.model";
import { Test } from "@/models/test.model";

class testService
{
    async createNewTest(quiz, enrollment)
    {
        try
        {
            const test = await Test.create({quizDetails: quiz, enrollment});
            await test.save(); 
            return test            
        }
        catch(error)
        {
            throw error
        }
    }

    async findAll()
    {
        try
        {
            const quizzes = await Test.find();
            return quizzes
        }
        catch(error)
        {
            return error
        }
    }

    async findById(id)
    {
        try
        {
            const quiz = await Test.findById(id).populate({path: 'quizDetails', model: Quiz})
            return quiz
        }
        catch(error)
        {
            throw error
        }
    }

    async updateScores(quizId, score, answers)
    {
        try
        {
            return await Test.findByIdAndUpdate(quizId, {$set: {score, answers, status: 'Completed'}})
        }
        catch(error)
        {
            console.log(error)
            throw error
        }
    }
}

export default testService