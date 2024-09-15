import { Feedback } from "@/models/feedback.model";

class feedbackService
{

    async newFeedback(user, rating, comment)
    {
        try
        {
            const feedback = await Feedback.create({user, rating, comment})
            await feedback.save();
            return feedback;
        }
        catch(error)
        {
            throw error
        }
    }

    async getAllFeedbacks()
    {
        try
        {
            const feedbacks = await Feedback.find({}) 
            return feedbacks
        }
        catch(error)
        {
            throw error
        }
    }
}

export default feedbackService