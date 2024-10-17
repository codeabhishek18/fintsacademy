'use client'

import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import styles from './styles.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const NewBatch = () =>
{    
    const [ courses, setCourses ] =  useState(null); 
    const [ mentors, setMentors ] = useState(null);
    const router = useRouter();

    const getCourses = async () =>
    {
        const url = `/api/course`
        const response = await axios.get(url);
        setCourses(response.data.courses);
    }

    const getMentors = async () =>
    {
        const url = `/api/mentor`
        const response = await axios.get(url);
        setMentors(response.data.mentors);
    }

    useEffect(()=>
    {
        getCourses();
        getMentors();
    },[])

    
    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const courseId = formData.get('course')
        const mentor = formData.get('mentor')
        const title = formData.get('title')
        const startDate = new Date(formData.get('start-date')).toUTCString()
        const endDate = new Date(formData.get('end-date'))

        try
        {
            const url = '/api/batch'
            const response = await axios.post(url, {title, courseId, mentor, startDate, endDate})
            toast.success(response.data.messsage);
            router.push('/admin/batches');
        }
        catch(error)
        {
            toast.error(error.messsage);
        }
    }

    return(
        <form onSubmit={handleSubmit} className={styles.container}>
            <FormControl className={styles.inputs} fullWidth>
                <InputLabel color='grey' sx={{color: 'grey'}} variant='outlined'>Choose course</InputLabel>
                <Select color='grey' sx={{color: 'grey'}} placeholder="Multiple answers" InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} name="course" label="Choose course">
                    {courses?.map((course) =>
                    (
                        <MenuItem value={course._id} key={course._id}>{course.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className={styles.inputs} fullWidth>
                <InputLabel color='grey'  sx={{color: 'grey'}} variant='outlined'>Choose mentor</InputLabel>
                <Select color='grey' name="mentor" sx={{color: 'grey'}} placeholder="Multiple answers" InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} label="Choose mentor">
                    {mentors?.map((mentor) =>
                    (
                        <MenuItem value={mentor._id} key={mentor._id}>{mentor.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField className={styles.inputs} color='grey' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} placeholder="Batch title" type="text" name="title" fullWidth/>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField className={styles.inputs} placeholder="Start date" color='grey' name='start-date' format="YYYY/MM/DD" InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} fullWidth/>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField className={styles.inputs} placeholder="End date" color='grey' name='end-date' format="YYYY/MM/DD" InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} fullWidth/>
            </LocalizationProvider>
                        
            <button className={styles.create} type='submit'>Create</button>
        </form>
    )
}

export default NewBatch