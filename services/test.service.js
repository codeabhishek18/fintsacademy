import { Test } from "@/models/test.model";

class testService
{
    async createNewTest(title, quiz)
    {
        try
        {
            const test = await Test.create({title, quiz});
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
            const quiz = await Test.findById(id)
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