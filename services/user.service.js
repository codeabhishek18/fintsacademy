import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import { Batch } from "@/models/batch.model.js";
// import { Course } from "@/models/course.model.js";
// import { Session } from "@/models/session.model.js";
// import { Mentor } from "@/models/mentor.model.js";
// import { Chat } from "@/models/chat.model.js";
// import { Message } from "@/models/message.model.js";
// import { Assessment } from '@/models/assessment.model.js';
// import { Test } from '@/models/test.model.js';

import { User } from "@/models/user.model";
import { Enrollment } from '@/models/enrollment.model';
import { Batch } from '@/models/batch.model';
import { Course } from '@/models/course.model';
import { Test } from '@/models/test.model';
import { Chat } from '@/models/chat.model';
import { Message } from '@/models/message.model';
import { Trigger } from '@/models/trigger.model';

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
            throw error;
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

    async updateEnrollment(userId, enrollmentId)
    {
        try
        {
            return await User.findByIdAndUpdate(userId, {$push: {enrollments : enrollmentId}, $set: {role: 'user'}})
        }
        catch(error)
        {
            throw error;
        }
    }

    async findAll()
    {
        try
        {
            const users = await User.find({}).select('-password -googleId');
            return users;
        }
        catch(error)
        {
            throw error
        }
    }

    async updateUserName(userId, name)
    {
        try
        {
            return await User.findByIdAndUpdate(userId, {$set : {name}})
        }
        catch(error)
        {
            throw error
        }
    }

    async getUserById(id)
    {
        try
        {
            
            const user = await User.findById(id)
            .populate(
            [{
                path: 'enrollments',
                model: Enrollment,
                populate: 
                [{
                    path: 'batch', 
                    model: Batch,
                    populate:
                    {
                        path: 'course',
                        model: Course
                    }
                },
                {
                    path: 'simulation',
                    model: Trigger,
                },
                {
                    path: 'assessments',
                    model: Test
                }]
            },
            {
                path: 'chats',
                model: Chat,
                populate:
                [
                    {
                        path: 'sender',
                        model: User
                    },
                    {
                        path: 'receiver',
                        model: User
                    },
                    {
                    path: 'message',
                    model:  Message
                }]
            }])
            
            return user
        } 
        catch(error)
        {
            throw error
        }
    }

    async hashPassword(password)
    {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async checkPassword(userPassword, dbPassword)
    {
        const response = await bcrypt.compare(userPassword, dbPassword)
        return response
    }

    async updateChat(userId, chatId)
    {
        try
        {
            return await User.findByIdAndUpdate(userId, {$push : {chat : chatId}})
        }
        catch(error)
        {
            throw error
        }
    }

    async getMonthlyEnrollments()
    {
        try
        {
            const monthlyEnrollments = await User.aggregate([
                {
                  $group: {
                    _id: { $month: "$updatedAt" },
                    count: { $sum: 1 }
                  }
                },
                { $sort: { _id: 1 } } // Sort by month
              ]);
              return monthlyEnrollments;
        }
        catch(error)
        {
            throw error
        }
    }

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