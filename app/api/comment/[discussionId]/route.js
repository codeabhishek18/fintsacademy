import dbConnect from "@/dbConfig/dbConnect";
import commentService from "@/services/comment.service";
import forumService from "@/services/forum.service";
import { NextResponse } from "next/server";
const commentInstance = new commentService();
const forumInstance = new forumService();

export async function POST(req, {params})
{
    try
    {
        await dbConnect();

        const {discussionId} = params;
        const {author, comment} = await req.json();
        const newComment = await commentInstance.addNewComment(author, comment)
        await forumInstance.addCommentToDiscussion(newComment._id, discussionId)
        return NextResponse.json({message: 'Sent'})
    }
    catch(error)
    {
        return NextResponse.json({error})
    }
}