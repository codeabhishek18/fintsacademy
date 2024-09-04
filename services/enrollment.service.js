import { Enrollment } from "@/models/enrollment.model";

class enrollmentService
{

    async enroll(user, batch)
    {
        try
        {
            const enrollment = await Enrollment.create({user, batch})
            await enrollment.save();
            return enrollment;
        }
        catch(error)
        {
            return error
        }
    }

    async assignTest(userId, testId)
    {
        try
        {
            return await Enrollment.findOneAndUpdate({user: userId}, {$push : {assessments: testId}})
        }
        catch(error)
        {
            throw error
        }
    }
}

export default enrollmentService