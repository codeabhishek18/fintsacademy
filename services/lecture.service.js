import { Lecture } from "@/models/lecture.model";

class lectureService
{
    async create(description, duration)
    {
        try
        {
            const newLecture = await Lecture.create({description, duration})
            return await newLecture.save();
        }
        catch(error)
        {
            throw error
        }
    }
}

export default lectureService