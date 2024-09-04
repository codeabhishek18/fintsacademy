'use client'

import { TextField } from '@mui/material';
import styles from './styles.module.css' 
import axios from "axios";

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
        const url = '/api/course'
        const repsonse = await axios.post(url, {title, description, imageURL, price, offerPrice, level});
        console.log(repsonse);
    }

    return(
        <div className={styles.container}>
            <p className={styles.header}>Add Course</p>

            <form className={styles.form} onSubmit={handleSubmit}>
                <TextField size='small' color='grey' className={styles.title} name='title' placeholder='Course Title' />
                <TextField size='small' color='grey' className={styles.title} name='description' placeholder='Description'/>
                <TextField size='small' color='grey' className={styles.title} name='price' placeholder='Price' />
                <TextField size='small' color='grey' className={styles.title} name='offerPrice' placeholder='Offer price' />
                <TextField size='small' color='grey' className={styles.title} name='imageURL' placeholder='Image url ' />
                <TextField size='small' color='grey' className={styles.title} name='level' placeholder='Level' />
                <button className={styles.createButton} type="submit">Add Course</button>
            </form>

        </div>
    )
    
}

export default CourseForm