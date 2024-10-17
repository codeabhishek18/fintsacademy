'use client'

import { TextField } from '@mui/material';
import styles from './styles.module.css' 
import axios from "axios";
import Button from '@/app/components/button/Button';
import { toast } from 'sonner';

const CourseForm = () =>
{

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title');
        const description = formData.get('description');
        const price = formData.get('price');
        const offerPrice = formData.get('offerPrice');
        const imageURL = formData.get('imageURL');
        const level = formData.get('level');

        
        if(!title)
            return toast.error('Title missing')

        try
        {
            const url = '/api/course'
            await axios.post(url, {title, description, imageURL, price, offerPrice, level});
            
        }
        catch(error)
        {
            toast.error(error.meessage);
        }
    }

    return(
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <TextField size='large' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} sx={{color:'grey'}} className={styles.title} name='title' placeholder='Course Title' />
                <TextField size='large' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} sx={{color:'grey'}} className={styles.title} name='description' placeholder='Description'/>
                <TextField size='large' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} sx={{color:'grey'}} className={styles.title} name='price' placeholder='Price' />
                <TextField size='large' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} sx={{color:'grey'}} className={styles.title} name='offerPrice' placeholder='Offer price' />
                <TextField size='large' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} sx={{color:'grey'}} className={styles.title} name='imageURL' placeholder='Image url ' />
                <TextField size='large' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} sx={{color:'grey'}} className={styles.title} name='level' placeholder='Level' />
                <Button label='Create' action={()=>{}}/>
            </form>

        </div>
    )
    
}

export default CourseForm