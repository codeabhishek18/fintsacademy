import dbConnect from "@/dbConfig/dbConnect";
import batchService from "@/services/batch.service";
const batchInstance = new batchService();

export async function GET(req, {params})
{
    try
    {
        await dbConnect();

        const {batchId} = params;
        const batch = await batchInstance.findById(batchId);
        return new Response(JSON.stringify(batch))
    }
    catch(error)
    {
        console.log(error)
    }
}