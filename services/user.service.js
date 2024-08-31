// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import { Batch } from "@/models/batch.model.js";
// import { Course } from "@/models/course.model.js";
// import { Session } from "@/models/session.model.js";
// import { Mentor } from "@/models/mentor.model.js";
// import { Chat } from "@/models/chat.model.js";
// import { Message } from "@/models/message.model.js";
// import { Assessment } from '@/models/assessment.model.js';
// import { Test } from '@/models/test.model.js';

import { User } from "../models/user.model.js";

class userService 
{
    async signup(name, email, password)
    {
        try
        {
            const hashedPassword = await this.hashPassword(password);
            const newUser = await User.create({name, email, password: hashedPassword});
            return await newUser.save();
        }
        catch(error)
        {
            return error;
        }
    }

    async googleAuth(name, email, googleId)
    {
        try
        {
            const newUser = await User.create({name, email, googleId});
            return await newUser.save();
        }
        catch(error)
        {
            console.log('error', error)
            throw error;
        }
    }

    async findByEmail(email)
    {
        try
        {
            const user = await User.findOne({email}); 
            return user;
        }
        catch(error)
        {
            throw error
        }
    }

    // async enrollUser(user, batch, assessment)
    // {
    //     try
    //     {
    //         return await User.findByIdAndUpdate(user, {$push: {batch, assessment}, $set: {role: 'user'}})
    //     }
    //     catch(error)
    //     {
    //         return error;
    //     }
    // }

    // async findAll()
    // {
    //     try
    //     {
    //         const users = await User.find({});
    //         return users;
    //     }
    //     catch(error)
    //     {
    //         return error
    //     }
    // }

    // async findById(id)
    // {
    //    try
    //    {
    //     const user = await User.findById(id)
    //     .populate(
    //     {
    //         path: 'batch',
    //         model: Batch,
    //         populate : 
    //         [{
    //             path : 'course', 
    //             model : Course
    //         },
    //         {
    //             path : 'sessions',
    //             model : Session
    //         },
    //         {
    //             path : 'mentor',
    //             model : Mentor
    //         }]
    //     })
    //     .populate(
    //     {
    //         path: 'chat',
    //         model: Chat,
    //         populate: 
    //         {
    //             path: 'message',
    //             model: Message
    //         }
    //     })
    //     .populate(
    //     {
    //         path: 'assessment',
    //         model: Assessment,
    //         populate:
    //         [{
    //             path: 'batch',
    //             model: Batch,
    //             populate:
    //             {
    //                 path: 'course',
    //                 model: Course
    //             }
    //         },
    //         {
    //             path: 'test',
    //             model: Test
    //         }]
    //     })
    //     return user;
    //    } 
    //    catch(error)
    //    {
    //     return error
    //    }
    // }

    

    // async hashPassword(password)
    // {
    //     const salt = await bcrypt.genSalt(10);
    //     return await bcrypt.hash(password, salt);
    // }

    // async checkPassword(userPassword, dbPassword)
    // {
    //     const response = await bcrypt.compare(userPassword, dbPassword)
    //     return response
    // }

    // generateAccessToken(id)
    // {
    //     return jwt.sign({ _id : id }, process.env.ACCESS_TOKEN_SECRETKEY, { expiresIn : process.env.ACCESS_TOKEN_EXPIRY})  
    // }

    // generateRefreshToken(id)
    // {
    //     return jwt.sign({ _id : id }, process.env.REFRESH_TOKEN_SECRETKEY, { expiresIn : process.env.REFRESH_TOKEN_EXPIRY})  
    // }

    // async updateTokens(id)
    // {
    //     try
    //     {
    //         return await User.findOneAndUpdate(id, 
    //             {   
    //                 $set : 
    //                 {
    //                     refreshToken : undefined
    //                 }
    //             },
    //             {
    //                 new : true
    //             }
    //         )
    //     }
    //     catch(error)
    //     {
    //         throw new Error(error.message || 'Failed to logout')
    //     }
    // }

    // async updateEnrollment(studentId, enrollmentId)
    // {
    //     try
    //     {
    //         const newStudent = await User.findByIdAndUpdate(studentId, { $push : { enrolled_courses : enrollmentId}},{new : true})
    //         return newStudent
    //     }
    //     catch(error)
    //     {
    //         throw new Error('Enrollment to course failed')
    //     }
    // }

    // async updateChat(userId, chatId)
    // {
    //     try
    //     {
    //         return await User.findByIdAndUpdate(userId, {$push : {chat : chatId}})
    //     }
    //     catch(error)
    //     {
    //         throw new Error('Failed to update chat')
    //     }
    // }

    // async createTest(userId, quizId)
    // {
    //     try
    //     {
    //         return await User.findByIdAndUpdate(userId, {$push : {quiz: quizId}})
    //     }
    //     catch(error)
    //     {
    //         return error
    //     }
    // }

    // async delete(id)
    // {
    //     try
    //     {
    //         return await User.findByIdAndDelete(id);
    //     }
    //     catch(error)
    //     {
    //         throw new Error('Failed to delete user');
    //     }
    // }
}

export default userService