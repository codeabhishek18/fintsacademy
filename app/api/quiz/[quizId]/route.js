import testService from "@/services/test.service";
import assignmentService from "@/services/assignment.service";
import groupService from "@/services/group.service";
import quizService from "@/services/quiz.service";
import batchService from "@/services/batch.service";
import enrollmentService from "@/services/enrollment.service";

const testInstance = new testService();
const assignmentInstance = new assignmentService();
const groupInstance = new groupService();
const quizInstance = new quizService();
const batchInstance = new batchService();
const enrollmentInstance = new enrollmentService();

import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import mongoose from "mongoose";


export async function POST(req, {params}) 
{
    const session = await mongoose.startSession();
    session.startTransaction();

    try
    {
        await dbConnect();
        
        const {quizId} = params;
        const {enrollments, batch} = await req.json();
        
        // const batchId = await batchInstance.findById(batch);

        console.log(enrollments, batch, quizId)
        // const quiz = await quizInstance.getQuizById(quizId);
        // let group = null;
        // let isOldGroup = [];
        // const groups = quiz.group;
        // if(!groups.length)
        //     group = await groupInstance.createGroup(batchId._id)
        // else 
        // {
        //     isOldGroup = groups.find((group)=> group.batch._id.toString() === batchId._id.toString());
        //     group = isOldGroup ? isOldGroup : await groupInstance.createGroup(batchId._id)
        // }

        const group = await groupInstance.createGroup(batch)
        console.log(group);
        
        for(let enrollment of enrollments)
        {
            const test = await testInstance.createNewTest(quizId, enrollment);
            console.log(test);
            await enrollmentInstance.assignTest(enrollment, test._id.toString())
            // const assignment = await assignmentInstance.assign(user, test._id)
            await groupInstance.updateAssignment(group._id.toString(), test._id.toString())
        }
        
        // if(!isOldGroup?.length)
        await quizInstance.updateGroup(quizId, group._id.toString())

    return NextResponse.json({message: 'Assigned successfully'})
    }
    catch(error)
    {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json({error: error.message})
    }
}

export async function GET(req, {params})
{
    try
    {
        await dbConnect();

        const {quizId} = params;
        const quiz = await quizInstance.getQuizByTitle(quizId);
        return NextResponse.json(quiz);
    }
    catch(error)
    {
        console.log(error)
        return NextResponse.json({error: error.message})
    }
}





