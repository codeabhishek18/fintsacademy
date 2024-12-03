import { Assignment } from "@/models/assignment.model";
import { Batch } from "@/models/batch.model";
import { Course } from "@/models/course.model";
import { Enrollment } from "@/models/enrollment.model";
import { Group } from "@/models/group.model"
import { Mentor } from "@/models/mentor.model";
import { Quiz } from "@/models/quiz.model";
import { Test } from "@/models/test.model";
import { User } from "@/models/user.model";

class groupService
{
    async createGroup(batch)
    {
        try
        {
            const group = await Group.create({batch});
            await group.save(); 
            return group;
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
            const group = await Group.find()
            .populate({path: 'batch', model: Batch})
            .populate({
                path: 'tests',
                model: Test,
                populate:
                {
                    path: 'enrollment',
                    model: Enrollment,
                    populate:
                    {
                        path: 'user', 
                        module: User
                    }
                }
            })
            
            return group;
        }
        catch(error)
        {
            return error
        }
    }

    async findById(groupdId)
    {
        try
        {
            const group = await Group.findById(groupdId)
            .populate({
                path: 'batch', 
                model: Batch, 
                populate:
                [{ 
                    path: 'mentor', 
                    model: Mentor
                },
                {
                    path: 'course', 
                    model:Course
                }]})
            .populate({
                path: 'tests',
                model: Test,
                populate:
                [{
                    path: 'enrollment',
                    model: Enrollment,
                    populate:
                    {
                        path: 'user', 
                        module: User
                    }
                },
                {
                    path: 'quizDetails',
                    model: Quiz
                }]
            })
            return group;
        }
        catch(error)
        {
            throw error
        }
    }

    // async findBatch(batchId)
    // {
    //     try
    //     {
    //         const batch = await Group.findOne({batch: batchId});
    //         return batch
    //     }   
    //     catch(error)
    //     {
    //         throw error
    //     }
    // }

    async updateAssignment(groupId, testId)
    {
        try
        {
            return await Group.findByIdAndUpdate(groupId, {$push: {tests: testId}})
        }
        catch(error)
        {
            return error
        }
    }
}

export default groupService