import { Assessment } from "@/models/assessment.model";

class assessmentService
{

    async create(batch)
    {
        try
        {
            const assessment = await Assessment.create({batch})
            await assessment.save();
            return assessment;
        }
        catch(error)
        {
            return error
        }
    }
}

export default assessmentService