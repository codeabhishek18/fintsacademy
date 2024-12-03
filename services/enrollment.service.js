import { Batch } from "@/models/batch.model";
import { Course } from "@/models/course.model";
import { Enrollment } from "@/models/enrollment.model";
import { Mentor } from "@/models/mentor.model";
import { Session } from "@/models/session.model";
import { Trigger } from "@/models/trigger.model";
import { TriggerResponse } from "@/models/triggerResponse.model";
import { Test } from "@/models/test.model";
import { User } from "@/models/user.model";
import { Quiz } from "@/models/quiz.model";

class enrollmentService
{

    async enroll(user, batch)
    {
        try
        {
            const enrollment = await Enrollment.create({user, batch})
            await enrollment.save();
            return enrollment;
        }
        catch(error)
        {
            return error
        }
    }

    async assignTest(enrollmentId, testId)
    {
        try
        {
            return await Enrollment.findByIdAndUpdate(enrollmentId, {$push : {assessments: testId}})
        }
        catch(error)
        {
            throw error
        }
    }

    async getEnrollmentById(enrollmentId)
    {
        try
        {
            const enrollment = await Enrollment.findById(enrollmentId)
            .populate(
            [{
                path: 'batch', 
                model: Batch,
                populate:
                [{
                    path: 'course',
                    model: Course
                },
                {
                    path: 'sessions',
                    model: Session
                },
                {
                    path: 'mentor',
                    model: Mentor
                }]
            },
            {
                path: 'simulation',
                model: TriggerResponse,
                populate:
                {
                    path: 'trigger',
                    model: Trigger
                }
            },
            {
                path: 'assessments',
                model: Test,
                populate:
                {
                    path: 'quizDetails',
                    model: Quiz
                }
            }])

            return enrollment
        }
        catch(error)
        {
            throw error
        }
    }

    async assignSimulationTriggers(enrollmentId, triggerId)
    {
        try
        {
            return await Enrollment.findByIdAndUpdate(enrollmentId, {$push : {simulation: triggerId}})
        }
        catch(error)
        {
            throw error
        }
    }

    async getEnrollments()
    {
        try
        {
            const enrollments = await Enrollment.find({}).populate({path: 'user', module: User});
            return enrollments
        }
        catch(error)
        {
            throw error
        }
    }
}

export default enrollmentService