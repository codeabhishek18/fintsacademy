import { Trigger } from "@/models/trigger.model";
import { TriggerResponse } from "@/models/triggerResponse.model";

class triggerResponseService
{
    async createTriggerResponse(trigger, batch, user)
    {
        try
        {
            const newTriggerResponse = await TriggerResponse.create({ trigger, batch, user })
            await newTriggerResponse.save();
            return newTriggerResponse
        }
        catch(error)
        {
            console.log(error);
            throw error
        }
    }

    async getTriggerResponseById(triggerId)
    {
        try
        {
            const trigger = await TriggerResponse.findById(triggerId)
            .populate({path: 'trigger', model: Trigger});
            return trigger
        }
        catch(error)
        {
            throw error
        }
    }

    async updateTriggerResponse(triggerId, response)
    {
        try
        {
            return await TriggerResponse.findByIdAndUpdate(triggerId, {$set: { response, status: 'Completed' }});
        }
        catch(error)
        {
            throw error
        }
    }
}

export default triggerResponseService