import { Lecture } from "@/models/lecture.model";

class lectureService
{
    async addNewLecture(description, duration)
    {
        try
        {
            const lecture = await Lecture.create({description, duration})
            await lecture.save();
            return lecture
        }
        catch(error)
        {
            throw error
        }
    }
}

export default lectureService