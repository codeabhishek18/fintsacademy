'use client'

import { useEffect, useState } from 'react'
import BillingCard from '../components/billingCard/BillingCard'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import styles from './styles.module.css'
import axios from 'axios'
import Image from 'next/image'
import { FormatDate } from '@/utility/FormatDate'
import { CircularProgress, FormControl, InputLabel, MenuItem, Rating, Select } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { setDate } from 'date-fns'

const Checkout = () =>
{
    const [ batch, setBatch ] = useState(null);
    const [ date, setDate ] = useState('');
    const router = useRouter();
    const { data, status } = useSession();

    useEffect(()=>
    {
        if(!data && status !== 'loading')
        {
            signIn(null, {callbackUrl: '/checkout'})
        }
        
        // const course = localStorage.getItem('selectedCourse')
        // if(course)
        //     getCourse(course);
    },[status])

    useEffect(()=>
    {
        getBatch();
    },[])

    const getBatch = async () =>
    {
        try
        {
            const url = `/api/batch`
            const response = await axios.get(url);
            const batch = response.data.find((batch)=>  batch._id === '66f7847fd89d2721884fd23d')
            setBatch(batch);
        }
        catch(error)
        {
            console.log(error)
        }
    }

    console.log(batch)

    return(
        <div className={styles.wrapper}>
            <Header/>
            <div className={styles.container}>
                <div className={styles.register}>
                    {batch && 
                    <div className={styles.card}>
                        <div className={styles.display}>
                            <Image className={styles.displayImage} src={batch.course.imageURL} alt={batch.course.id} layout='fill'/>
                        </div>
                        <div className={styles.content}>
                            <p className={styles.title}>{batch.course.title}</p>
                            <p className={styles.level}>{batch.course.level}</p>
                            <Rating name="half-rating-read" defaultValue={4.7} precision={0.5} readOnly size='small'/>
                            <p className={styles.date}>Starting from {FormatDate(batch.startDate)}</p>
                        </div>
                    </div> }
                    {batch && <BillingCard batch={batch}/> }
                </div> 
                {data && <div className={styles.details}>
                    <div className={styles.group}>
                        <p className={styles.label}>Name</p>
                        <p className={styles.detail}>{data.user.name}</p>    
                    </div>
                    <div className={styles.group}>
                        <p className={styles.label}>Email</p>
                        <p className={styles.detail}>{data.user.email}</p>    
                    </div>
                </div>}
            </div>
            <Footer/>
        </div>
    )
}

export default Checkout