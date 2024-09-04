
import dbConnect from "@/dbConfig/dbConnect";
import forumService from "@/services/forum.service";
const forumInstance = new forumService();

export async function DELETE(req, {params})
{
    try
    {
        await dbConnect();
        const {id} = params;
        await forumInstance.deleteById(id);
        return new Response(JSON.stringify({message : 'Discussion deleted'}))
    }
    catch(error)
    {
        return error
    }
}