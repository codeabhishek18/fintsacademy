import { Course } from "@/models/course.model.js";
import { Batch } from "../models/batch.model.js"; 
import { User } from "@/models/user.model.js";
import { Session } from "@/models/session.model.js";
import { Mentor } from "@/models/mentor.model.js";

class batchService
{
    async addNewBatch(title, course, mentor, startDate, endDate)
    {
        try
        {
            const newBatch = await Batch.create({title, course, mentor, startDate, endDate})
            await newBatch.save()
            return newBatch
        }
        catch(error)
        {
            console.log(error)
            throw new Error(error.message)
        }
    }

    async findById(title)
    {
        try
        {
            const batch = await Batch.findOne({title})
            .populate({path: 'course', model: Course})
            .populate({path: 'enrollments', model: User})
            .populate({path: 'sessions', model: Session})
            .populate({path: 'mentor', model: Mentor})
            return batch 
        } 
        catch(error)
        {
            throw new Error('Failed to fetch batches')
        }
    }

    async getById(id)
    {
        try
        {
            const batch = await Batch.findById(id);
            return batch
        }
        catch(error)
        {
            throw error
        }
    }

    async getAllBatches()
    {
        try
        {
            const batches = await Batch.find()
            .populate({path: 'course', model: Course})
            .populate({path: 'mentor', model: Mentor});
            return batches
        } 
        catch(error)
        {
            throw error
        }
    }

    async deleteById(batchId)
    {
        try
        {
            await Batch.deleteOne({_id:batchId})
            return this.findAll();
        }
        catch(error)
        {
            throw new Error('Failed to delete batch')
        }
    }

    async updateSessions(batchId, sessionId)
    {
        try
        {
            return await Batch.findByIdAndUpdate(batchId, { $push : { sessions : sessionId}});
        }
        catch(error)
        {
            throw new Error('Failed to create session')
        }
    }

    async findUpcomingBatches()
    {
        try
        {
            const upcomingBatches = await Batch.find({status:'Upcoming'}).populate('courseId');
            return upcomingBatches
        }
        catch(error)
        {
            throw new Error('Failed to fetch upcoming batches')
        }
    }

    async enrollUser(batchId, userId)
    {
        try
        {
            return await Batch.findByIdAndUpdate(batchId, {$push :{ enrollments : userId}})
        }
        catch(error)
        {
            throw new Error('Failed to update student to batch')
        }
    }

    async updateWhatsappLink(batchId, link)
    {
        try
        {
            return await Batch.findByIdAndUpdate(batchId, {$set :{ whatsappLink : link}})
        }
        catch(error)
        {
            throw new Error('Failed to update link')
        }
    }

    async updateZoomLink(batchId, link)
    {
        try
        {
            return await Batch.findByIdAndUpdate(batchId, {$set :{ zoomLink : link}})
        }
        catch(error)
        {
            throw new Error('Failed to update link')
        }
    }
}

export default batchService