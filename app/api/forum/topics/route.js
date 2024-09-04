import dbConnect from "@/dbConfig/dbConnect";
import forumService from "@/services/forum.service";
const forumInstance = new forumService();

export async function GET(req, res)
{
    try
    {
        await dbConnect();

        const topics = await forumInstance.getTopicsCount();
        return new Response(JSON.stringify(topics))
    }
    catch(error)
    {
        return error;
    }
}
