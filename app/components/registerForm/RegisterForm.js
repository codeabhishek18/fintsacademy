'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import { useRouter } from 'next/navigation';

const options = { year: 'numeric', month: 'long', day: 'numeric' };

const RegisterForm = () =>
{
    const [ user, setUser ] = useState({course: '', batch: ''})
    const [ courses, setCourses ] = useState(null);
    const [ batches, setBatches ] = useState(null);

    useEffect(()=>
    {
        getBatches();
    },[])

    const getBatches = async () =>
    {
        if(user.course)
        {
            const url = `/api/batch/course/${user.course}`
            const response = await axios.get(url);
            setBatches(response.data);
        }
    }

    const handleSubmit = async (e) =>
    {
        try
        {
            e.preventDefault();
            const url = `/api/user/signup`
            const response = await axios.post(url, user);
            enqueueSnackbar(response.data.message)
            router.push('/')
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return(
        <div className={styles.container}>
            <FormControl fullWidth>
                <InputLabel size='small' color='grey' id="demo-simple-select-label">Choose course</InputLabel>
                <Select
                    size='small' color='grey'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="course"
                    value={user.course}
                    label="Choose course"
                >
                    {courses?.map((course) =>
                    (
                        <MenuItem value={course._id} key={course._id}>{course.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel size='small' color='grey' id="demo-simple-select-label">Choose batch</InputLabel>
                <Select
                    size='small' color='grey'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="batch"
                    value={user.batch}
                    label="Choose course"
                    onChange={handleChange}
                >
                    {batches?.map((batch) =>
                    (
                        <MenuItem value={batch._id} key={batch._id}>{batch.title} - Starts from {new Date(batch.startDate).toLocaleDateString('en-US', options)}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <button className={styles.register} onClick={handleSubmit}>Register</button>
        </div>
    )
}

export default RegisterForm