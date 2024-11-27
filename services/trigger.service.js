import { Trigger } from "@/models/trigger.model";

class triggerService
{
    async createTrigger(triggerDetails)
    {
        try
        {
            const newTrigger = await Trigger.create(triggerDetails)
            await newTrigger.save();
            return newTrigger
        }
        catch(error)
        {
            throw error
        }
    }
}

export default triggerService