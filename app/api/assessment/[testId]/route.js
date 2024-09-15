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
        console.log(typeof(answers))
        const test = await testInstance.findById(testId); 
        let score = 0;
        for(let i=0;i<answers.length;i++)
        {
            const isCorrect = test.quiz[i].answers.every((ans)=> answers[i].includes(ans)) && (test.quiz[i].answers.length === answers[i].length)         
            if(isCorrect)
                score++
        }

        console.log('score', score)

        await testInstance.updateScores(testId, score, answers)
        return NextResponse.json({message: 'Assessment Completed'})
    }
    catch(error)
    {
        console.log(error.message)
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