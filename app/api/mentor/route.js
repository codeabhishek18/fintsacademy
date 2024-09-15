import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import mentorService from "@/services/mentor.service";
const mentorInstance = new mentorService();

export async function POST(req) 
{
    try
    {
        await dbConnect();

        const { name, email, phone, about, experience, linkedin }  = await req.json(); 
        console.log(name, email, phone, about, experience, linkedin)

        // let uploadURL = '';
        // if(imageURL)
        // {
        //     cloudinary.config({ 
        //         cloud_name: 'dzuaagm1a', 
        //         api_key: '571988555226261', 
        //         api_secret: 'AwXer8ckGTMRpRMOB2sjE0NN5Tw'
        //     });
        
        //     const uploadResult = await cloudinary.uploader
        //     .upload(imageURL, 
        //         {
        //            public_id: id,
        //         }
        //     )
        //     .catch((error) => 
        //     {
        //        console.log(error);
        //     });
        
        //     uploadURL = uploadResult.url
        // }
        
        await mentorInstance.addNewMentor(name, email, phone, about, experience, linkedin);
        return NextResponse.json({message: 'Mentor added'})
    }
    catch(error)
    {
        return NextResponse.json({error: error})
    }
} 

export async function GET() 
{
    try
    {
        await dbConnect();

        const mentors = await mentorInstance.getAllMentors()
        if(!mentors)
            throw new Error('Mentors not found')
        return NextResponse.json({mentors});
    }    
    catch(error)
    {
        return NextResponse.json({error})
    }
}