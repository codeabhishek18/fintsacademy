'use client'

import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import styles from './styles.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/loading/Loading';
import Button from '@/app/components/button/Button';

const NewBatch = () =>
{    
    const [ courses, setCourses ] =  useState(null); 
    const [ loading, setIsLoading ] = useState(true);
    const router = useRouter();

    const getCourses = async () =>
    {
        try
        {
            const url = `/api/course`
            const response = await axios.get(url);
            setCourses(response.data);
        }
        catch(error)
        {
            console.log(error);
        }
        finally
        {
            setIsLoading(false);   
        }
    }

    useEffect(()=>
    {
        getCourses();
    },[])

    
    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const triggerId = formData.get('triggerId')
        const description = formData.get('description')
        const session = formData.get('session')
        const type = formData.get('type')
        const course = formData.get('course')

        try
        {
            const url = '/api/trigger'
            const triggerDetails = { triggerId, description, session, type, course }
            const response = await axios.post(url, triggerDetails)
            toast.success(response.data.messsage);
            router.push('/admin/simulations');
        }
        catch(error)
        {
            toast.error(error.messsage);
        }
    }

    if(loading)
        return <Loading/>

    return(
        <form onSubmit={handleSubmit} className={styles.container}>

            <TextField className={styles.inputs} color='grey' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} placeholder="Description" type="text" name="description" fullWidth/>

            <TextField className={styles.inputs} color='grey' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} placeholder="Trigger ID" type="text" name="triggerId" fullWidth/>

            <TextField className={styles.inputs} color='grey' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} placeholder="Session" type="text" name="session" fullWidth/>

            <TextField className={styles.inputs} color='grey' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} placeholder="Type" type="text" name="type" fullWidth/>
            
            <FormControl className={styles.inputs} fullWidth>
                <InputLabel color='grey' sx={{color: 'grey'}} variant='outlined'>Choose course</InputLabel>
                <Select color='grey' sx={{color: 'grey'}} placeholder="Multiple answers" InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} name="course" label="Choose course">
                    {courses?.map((course) =>
                    (
                        <MenuItem value={course._id} key={course._id}>{course.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
                        
            <Button label='Create'/>
        </form>
    )
}

export default NewBatch