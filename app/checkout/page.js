'use client'

import { useEffect, useState } from 'react'
import BillingCard from '../components/billingCard/BillingCard'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import styles from './styles.module.css'
import axios from 'axios'
import Image from 'next/image'
import { FormatDate } from '@/utility/FormatDate'
import { Rating } from '@mui/material'

const Checkout = () =>
{
    const [ batch, setBatch ] = useState(null);

    useEffect(()=>
    {
        const course = localStorage.getItem('selectedCourse')
        if(course)
            getBatch(course);
    },[])

    const getBatch = async (course) =>
    {
        try
        {
            const url = `/api/batch/course/${course}`
            const response = await axios.get(url);
            setBatch(response.data.batch);
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return(
        <div className={styles.container}>
            <Header/>
            <div className={styles.register}>
                {batch && <div className={styles.card}>
                    <div className={styles.display}>
                        <Image className={styles.displayImage} src={batch.course.imageURL} alt={batch.course.id} layout='fill'/>
                    </div>
                    <div className={styles.content}>
                        <p className={styles.title}>{batch.course.title}</p>
                        <p className={styles.level}>{batch.course.level}</p>
                        <Rating name="half-rating-read" defaultValue={4.7} precision={0.5} readOnly size='small'/>
                        <p className={styles.date}>Starting from {FormatDate(batch.startDate)}</p>
                    </div>
                </div>}
                {batch && <BillingCard batch={batch}/>}
            </div>
            <Footer/>
        </div>
    )
}

export default Checkout