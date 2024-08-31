import { Session } from "../models/session.model.js";

class sessionService
{
    async addNewSession(id, description, duration)
    {
        try
        {
            const newSession = await Session.create({id, description, duration})
            await newSession.save();
            return newSession
        }
        catch(error)
        {
            throw new Error('Failed to add a session')
        }
    }

    async updateSessionStatus(sessionId, newStatus)
    {
        try
        {
            await Session.findByIdAndUpdate(sessionId, {$set : {status : newStatus}},{new : true}) 
        }
        catch(error)
        {
            throw new Error('Failed to update status')
        }
    }

}

export default sessionService