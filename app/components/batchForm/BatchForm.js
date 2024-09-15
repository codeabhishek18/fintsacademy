import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import styles from './BatchForm.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const BatchForm = () =>
{    
    const [ courses, setCourses ] =  useState(null); 
    const [ mentors, setMentors ] = useState(null);

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
        console.log(startDate, endDate)

        try
        {
            const url = '/api/batch'
            const response = await axios.post(url, {title, courseId, mentor, startDate, endDate})
            console.log(response)
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(
        <div className={styles.container}>
            <p className={styles.header}>Add Batch</p>

            <form onSubmit={handleSubmit} className={styles.form}>
            <FormControl className={styles.inputs} fullWidth>
                <InputLabel size='small' color='grey' sx={{color: 'grey'}} variant='outlined'>Choose course</InputLabel>
                <Select size='small' color='grey' sx={{color: 'grey'}} placeholder="Multiple answers" InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} name="course" label="Choose course">
                    {courses?.map((course) =>
                    (
                        <MenuItem value={course._id} key={course._id}>{course.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className={styles.inputs} fullWidth>
                <InputLabel size='small' color='grey'  sx={{color: 'grey'}} variant='outlined'>Choose mentor</InputLabel>
                <Select size='small' color='grey' name="mentor" sx={{color: 'grey'}} placeholder="Multiple answers" InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} label="Choose mentor">
                    {mentors?.map((mentor) =>
                    (
                        <MenuItem value={mentor._id} key={mentor._id}>{mentor.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField className={styles.inputs} color='grey' size='small' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} placeholder="Batch title" type="text" name="title" fullWidth/>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField className={styles.inputs} placeholder="Start date" size='small' color='grey' name='start-date' format="YYYY/MM/DD" InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} fullWidth/>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField className={styles.inputs} placeholder="End date" size='small' color='grey' name='end-date' format="YYYY/MM/DD" InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} fullWidth/>
            </LocalizationProvider>
                        
            <button className={styles.createButton} type='submit'>Create</button>
            </form>
            
        </div>
    )
}

export default BatchForm