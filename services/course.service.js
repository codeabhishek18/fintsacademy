import { Course } from "@/models/course.model.js";
import { Lecture } from "@/models/lecture.model";

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
            const courses = await Course.find({}).populate({path: 'lectures', model: Lecture});
            if(!courses)
                throw new Error('Courses not found')
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
            const course = await Course.findById(id).populate({path: 'lectures', model: Lecture})
            if(!course)
                throw new Error('Course not found')
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
            const course = await Course.findOne({id}).populate({path: 'lectures', model: Lecture})
            if(!course)
                throw new Error('Course not found')
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
}

export default courseService