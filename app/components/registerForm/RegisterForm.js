'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import { useSelector } from 'react-redux';

const options = { year: 'numeric', month: 'long', day: 'numeric' };

const RegisterForm = ({batches}) =>
{
    
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
                <InputLabel size='small' color='grey'>Choose batch</InputLabel>
                <Select size='small' color='grey' name="batch" label="Choose course">
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