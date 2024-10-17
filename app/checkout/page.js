'use client'

import { useEffect, useState } from 'react'
import BillingCard from '../components/billingCard/BillingCard'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import styles from './styles.module.css'
import axios from 'axios'
import Image from 'next/image'
import { CircularProgress, FormControl, InputLabel, MenuItem, Rating, Select } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'sonner'
import Loading from '../components/loading/Loading'
import { FormatDate } from '@/utility/FormatDate'
import deleteIcon from '@/assets/delete.png'

const Checkout = () =>
{
    const [ course, setCourse ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const { data, status } = useSession();
    const [ batches, setBatches ] = useState(null);
    const [ selectedBatch, setSelectedBatch ] = useState(false);

    useEffect(()=>
    {
        if(status === 'unauthenticated')
        {
            signIn(null, {callbackUrl: '/checkout'})
        }
    },[status])

    useEffect(()=>
    {
        const courseId = localStorage.getItem('selectedCourse')
        if(courseId)
            getCourse(courseId);
    },[])

    const getCourse = async (courseId) =>
    {
        try
        {
            setIsLoading(true);
            const url = `/api/course/${courseId}`
            const response = await axios.get(url);
            const batches = response.data.batches.filter((batch) => batch.status !== 'Completed');
            setBatches(batches);
            setCourse(response.data);
            setIsLoading(false);
        }
        catch(error)
        {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    const clearCart = () =>
    {
        localStorage.removeItem('selectedCourse');
        setCourse(null);
    }

    return(
        <div className={styles.wrapper}>
            <Header/>
            {status === 'loading' || isLoading ?
            <Loading/> : 
            (course ? 
            <div className={styles.container}>
                {data && 
                <div className={styles.details}>
                    <div className={styles.group}>
                        <p className={styles.label}>Name</p>
                        <p className={styles.detail}>{data.user.name}</p>    
                    </div>
                    <div className={styles.group}>
                        <p className={styles.label}>Email</p>
                        <p className={styles.detail}>{data.user.email}</p>    
                    </div>
                    <div className={styles.group}>
                        <p className={styles.label}>Select Batch</p>
                        <FormControl className={styles.input} fullWidth>
                            <Select color='grey' name="mentor" style= {{ color: '#ffffff'}} onChange={(e)=> {setSelectedBatch(e.target.value)}}>
                            {batches.map((batch) =>
                            (
                                <MenuItem value={batch._id} key={batch._id}>{FormatDate(batch.startDate) +' - '+ FormatDate(batch.endDate)}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>}
                <div className={styles.register}>
                    <div className={styles.card}>
                        <div className={styles.display}>
                            <Image className={styles.displayImage} src={course.imageURL} alt={course.id} layout='fill'/>
                        </div>
                        <div className={styles.content}>
                            <p className={styles.title}>{course.title}</p>
                            <p className={styles.level}>{course.level}</p>
                            <Rating name="half-rating-read" defaultValue={4.7} precision={0.5} readOnly size='small'/>
                            {/* <p className={styles.date}>Starting from {FormatDate(selectedBatch.startDate)}</p> */}
                        </div>
                        <Image className={styles.delete} src={deleteIcon} alt='icon' onClick={clearCart}/>
                    </div> 
                    <BillingCard course={course} selectedBatch={selectedBatch}/> 
                </div> 
                
            </div>: <div className={styles.cartWrapper}>Cart is empty</div>)}
            <Footer/>
        </div>
    )
}

export default Checkout