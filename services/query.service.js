import { Query } from "@/models/query.model";

class queryService
{

    async createQuery(name, email, query)
    {
        try
        {
            const newQuery = await Query.create({name, email, query});
            await newQuery.save();
            return;
        }
        catch(error)
        {
            throw error
        }
    }
}

export default queryService