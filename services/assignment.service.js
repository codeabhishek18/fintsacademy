import { Assignment } from "@/models/assignment.model";

class assignmentService
{

    async assign(user, test)
    {
        try
        {
            const assignment = await Assignment.create({user, test})
            await assignment.save();
            return assignment
        }
        catch(error)
        {
            return error
        }
    }
}

export default assignmentService