'use client'

import { FormControl, InputLabel, MenuItem, Rating, Select, TextField } from '@mui/material';
import styles from './Feedback.module.css'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'sonner';
import Loading from '@/app/components/loading/Loading';
import Button from '@/app/components/button/Button';
import { useRouter } from 'next/navigation';

const Feedback = () =>
{
    const [ value, setValue ] = useState(null);
    const [ feedback, setFeedbcak ] = useState('');
    const { data, status } = useSession();
    const [ courses, setCourses] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ courseId, setCourseId ] = useState('');
    const router = useRouter()

    const getCourses = async () =>
    {
        try
        {
            const url = '/api/course'
            const response = await axios.get(url);
            setCourses(response.data);
        }
        catch(error)
        {
            toast.error(error.message);   
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const submitFeedback = async (e) =>
    {
        e.preventDefault();

        if(status === 'unauthenticated')
            return 

        if(!courseId)
            return toast.error('Choose course')

        if(!value)
            return toast.error('Rating is mandatory')

        if(feedback.length < 10)
            return toast.error('Feedback is too short')

        try
        {
            const url = '/api/feedback'
            const response = await axios.post(url, {user: data.user.id, course: courseId, rating: value, comment: feedback }) 
            toast.success(response.data.message);
            router.push('/')
        }
        catch(error)
        {
            toast.error(error.message);
        }
    }

    useEffect(() => 
    {
        if(status === "authenticated")
            getCourses();
        else if(status === "unauthenticated")
        {
            toast.error('Kindly login to record your response')
            router.push('/')
        }
        else
            setIsLoading(true);
            
    }, [status]);

    if(status === 'loading' || isLoading)
        return <Loading/>

    return(
        <div className='flex flex-col justify-center items-center'>
            <div className={styles.container}>
            <h1 className={styles.title}>Feedback</h1>
            <FormControl className={styles.feedback} value={courseId} fullWidth >
                <InputLabel style={{color:'grey'}} >Choose Course</InputLabel>
                <Select name="course" color='error' style={{color:'white'}}  sx={{color: 'grey'}} label='Choose Course' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} onChange={(e)=> setCourseId(e.target.value)}>
                {courses.map((course) =>
                (
                    <MenuItem value={course._id} key={course._id}>{course.title}</MenuItem>
                ))}
                </Select>
            </FormControl>
            <p className={styles.description}>
                As we approach the end of our current sprint, 
                we value your feedback to help us improve our offerings 
                and provide the best possible experience for you.
            </p>
            
            <Rating name="size-large" className={styles.rating} sx={{'& .MuiRating-iconEmpty': { color: 'gold'}}} value={value} onChange={(event, newValue) => {setValue(newValue)}} size="large"  />
            <TextField className={styles.feedback}  value={feedback} onChange={(e)=> setFeedbcak(e.target.value)}
            InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} placeholder='Feedback' color='grey' fullWidth/>
            <Button label='Submit' action={submitFeedback}/>
        </div>
        </div>
    )
}

export default Feedback