import { Batch } from "@/models/batch.model";
import { Course } from "@/models/course.model.js";
import { Lecture } from "@/models/lecture.model";
import { Simulation, Trigger } from "@/models/trigger.model";

class courseService
{
    async create(id, title, description, price, offerPrice, imageURL, level)
    {
        try
        {
            const newCourse = await Course.create({id, title, description, price, offerPrice, imageURL, level})
            if(!newCourse)
                throw new Error('Failed to create new course')
            return await newCourse.save();
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
            const courses = await Course.find().populate({path: 'lectures', model: Lecture});
            return courses
        }
        catch(error)
        {
            throw error
        }
    }

    async getByCourseId(id)
    {
        try
        {
            const course = await Course.findById(id)
            .populate({path: 'lectures', model: Lecture})
            .populate({path: 'simulation', model: Trigger})
            return course
        }
        catch(error)
        {
            throw error
        }
    }

    async findById(id)
    {
        try
        {
            const course = await Course.findOne({id})
            .populate({path: 'lectures', model: Lecture})
            .populate({path: 'batches', model: Batch})
            .populate({path: 'simulation', model: Trigger})
            return course
        }
        catch(error)
        {
            throw error
        }
    }

    async addLectureToCourse(courseId, lectureId)
    {
        try
        {
            return await Course.findByIdAndUpdate(courseId, {$push: {lectures: lectureId}})
        }
        catch(error)
        {
            throw error
        }
    }

    async addTriggersToCourse(courseId, triggerId)
    {
        try
        {
            console.log(courseId, triggerId);
            return await Course.findByIdAndUpdate(courseId, {$push: {simulation: triggerId}})
        }
        catch(error)
        {
            console.log(error)
            throw error
        }
    }

    async addBatchToCourse(courseId, batchId)
    {
        try
        {
            return await Course.findByIdAndUpdate(courseId, {$push: {batches: batchId}})
        }
        catch(error)
        {
            throw error
        }
    }

    async addFeedbacktoCourse(courseId, feedback)
    {
        try
        {
            return await Course.findByIdAndUpdate(courseId, {$push: {feedbacks: feedback}})
        }
        catch(error)
        {
            throw error
        }
    }
}

export default courseService