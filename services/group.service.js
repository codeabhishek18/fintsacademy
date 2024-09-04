import { Assignment } from "@/models/assignment.model";
import { Batch } from "@/models/batch.model";
import { Group } from "@/models/group.model"
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
                path: 'assignment',
                model: Assignment,
                populate:
                [{
                    path: 'user',
                    model: User
                },
                {
                    path: 'test',
                    model: Test
                }]
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
            .populate({path: 'batch', model: Batch})
            .populate({
                path: 'assignment',
                model: Assignment,
                populate:
                [{
                    path: 'user',
                    model: User
                },
                {
                    path: 'test',
                    model: Test
                }]
            })
            
            return group;
        }
        catch(error)
        {
            throw error
        }
    }

    async updateAssignment(group, assignment)
    {
        try
        {
            return await Group.findByIdAndUpdate(group, {$push: {assignment}})
        }
        catch(error)
        {
            return error
        }
    }
}

export default groupService