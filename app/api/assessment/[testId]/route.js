import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import testService from "@/services/test.service";
const testInstance = new testService();

export async function POST(req, {params}) 
{
    try
    {
        await dbConnect();
        const {testId} = params;
        const {answers} = await req.json();
        const test = await testInstance.findById(testId); 
        let score = 0;
        for(let i=0;i<answers.length;i++)
        {
            if(test.quiz[i].answer === answers[i])
                score++;
        }
        await testInstance.updateScores(testId, score, answers)
        return NextResponse.json({message: 'Assessment Completed'})
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}

export async function GET(req, {params}) 
{
    try
    {
        await dbConnect();
        const {testId} = params;
        console.log(testId)
        const test = await testInstance.findById(testId);
        return NextResponse.json(test);
    }
    catch(error)
    {
        return NextResponse.json({error: error.message});
    }
}