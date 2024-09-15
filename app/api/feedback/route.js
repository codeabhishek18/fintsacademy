import dbConnect from "@/dbConfig/dbConnect";
import feedbackService from "@/services/feedback.service";
import courseService from "@/services/course.service";
import { NextResponse } from "next/server";
const courseInstance = new courseService();
const feedbackInstance = new feedbackService

export async function POST(req) 
{
    try
    {
        await dbConnect();

        const { user, course, rating, comment } = await req.json()
        console.log(user, course, rating, comment )
        const feedback = await feedbackInstance.newFeedback(user, rating, comment);
        console.log(feedback)
        await courseInstance.addFeedbacktoCourse(course, feedback._id);
        return NextResponse.json({message: 'Feedback recorded'})
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}

export async function GET(req) 
{
    try
    {
        await dbConnect();
        const feedbacks = await feedbackInstance.getAllFeedbacks();
        return NextResponse.json(feedbacks)
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}