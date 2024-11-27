import { Batch } from "@/models/batch.model"
import { Course } from "@/models/course.model"
import { Enrollment } from "@/models/enrollment.model"
import { Feedback } from "@/models/feedback.model"
import { Mentor } from "@/models/mentor.model"
import { Session } from "@/models/session.model"
import { Trigger } from "@/models/trigger.model"
import { TriggerResponse } from "@/models/triggerResponse.model"
import { User } from "@/models/user.model"


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
            throw error
        }
    }

    async findById(title)
    {
        try
        {
            const batch = await Batch.findOne({title})
            .populate({path: 'course', model: Course, populate:[{path: 'feedbacks', model: Feedback}, {path: 'simulation', model: Trigger}]})
            .populate({path: 'enrollments', model: Enrollment, populate: [{ path: 'user', model: User}, {path: 'simulation', model: TriggerResponse}]})
            .populate({path: 'sessions', model: Session})
            .populate({path: 'mentor', model: Mentor})
            return batch 
        } 
        catch(error)
        {
            throw error
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
            const batches = await Batch.find({})
            .populate({path: 'course', model: Course})
            .populate({path: 'mentor', model: Mentor});
            return batches
        } 
        catch(error)
        {
            throw error
        }
    }

    async getBatchesByCourse(courseId)
    {
        try
        {
            const batches = await Batch.find({course: courseId})
            .populate({path: 'course', model: Course});
            return batches.length ? batches : null
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
            return await Batch.deleteOne({_id:batchId})
        }
        catch(error)
        {
            throw error
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
            throw error
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
            throw error
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
            throw error
        }
    }

    async updateSimulationResponses(batchId, simulationId)
    {
        try
        {
            return await Batch.findByIdAndUpdate(batchId, { $push : { simulationResponses : simulationId}});
        }
        catch(error)
        {
            throw error
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
            throw error
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
            throw error
        }
    }
}

export default batchService