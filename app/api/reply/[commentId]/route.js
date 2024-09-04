import replyService from "@/services/reply.service";
const replyInstance = new replyService();
import commentService from "@/services/comment.service";
import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
const commentInstance = new commentService();
 
export async function POST(req, {params})
{
    try
    {
        await dbConnect();

        const {commentId} = params;
        const {author, reply} = await req.json();
        const newReply = await replyInstance.addNewReply(author, reply)
        await commentInstance.addReplyToComment(commentId, newReply._id);
        return NextResponse.json({message: 'sent'});
    }
    catch(error)
    {
        return NextResponse.json({error: error.message});
    }
}