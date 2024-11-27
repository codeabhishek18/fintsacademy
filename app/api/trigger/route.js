import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import courseService from "@/services/course.service";
const courseInstance = new courseService();
import triggerService from "@/services/trigger.service";
const triggerInstance = new triggerService();

export async function POST(req, {params}) 
{
    try
    {
        await dbConnect();

        const triggerDetails = await req.json();
        const newTrigger = await triggerInstance.createTrigger(triggerDetails);
        
        await courseInstance.addTriggersToCourse(triggerDetails.course, newTrigger._id.toString());
        return NextResponse.json({message:'Trigger added'}); 
    }   
    catch(error)
    {
        return NextResponse.json({error: error.message})
    } 
}