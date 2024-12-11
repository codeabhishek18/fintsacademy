'use client'

import { useEffect, useState } from 'react'
import BillingCard from '../components/billingCard/BillingCard'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import styles from './styles.module.css'
import axios from 'axios'
import Image from 'next/image'
import { CircularProgress, FormControl, InputLabel, MenuItem, Rating, Select, TextField } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'sonner'
import Loading from '../components/loading/Loading'
import { FormatDate } from '@/utility/FormatDate'
import deleteIcon from '@/assets/delete.png'
import Button from '../components/button/Button'

const Checkout = () =>
{
    const [ course, setCourse ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const { data, status, update } = useSession();
    const session = useSession();
    const userId = data?.user?.id;
    const [ batches, setBatches ] = useState(null);
    const [ selectedBatch, setSelectedBatch ] = useState(false);
    const [ userName, setUserName ] = useState('');

    useEffect(()=>
    {
        if(status === 'unauthenticated')
        {
            signIn(null, {callbackUrl: '/checkout'})
        }
        if(status === 'authenticated')
            setUserName(data?.user?.name)
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

    console.log(session)

    const updateName = async () =>
    {
        if(userName.length < 2)
            return  toast.error('Name is too short')

        try
        {
            const newSession = {...session, user: { ...session?.user, name: userName}}
            setIsLoading(true);
            const url = `/api/user/${userId}`
            const response = await axios.put(url, {name: userName});
            await update(newSession);
            toast.success(response.data.message);
        }
        catch(error)
        {
            toast.error(error);
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const clearCart = () =>
    {
        localStorage.removeItem('selectedCourse');
        setCourse(null);
    }

    console.log(session?.data?.user?.role)

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
                        <div className='flex flex-col items-end gap-2'>
                            <TextField className='rounded bg-black'  value={userName} onChange={(e)=> setUserName(e.target.value)}
                            InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} placeholder='Enter your name' color='grey' fullWidth/>
                            <p className='text-gray-500 text-xs'><span className='italic'>The issued certificate will have the exact same name</span></p>
                            {data?.user.name !== userName && session?.data?.user?.role === 'visitor' && <Button label='Update' action={updateName}/>}
                        </div>   
                    </div>
                    <div className={styles.group}>
                        <p className={styles.label}>Email</p>
                        <p className='bg-black text-gray-500 p-4 rounded'>{data.user.email}</p>    
                    </div>
                    <div className={styles.group}>
                        <p className={styles.label}>Select Batch</p>
                        {batches.length > 0 ? <FormControl className={styles.input} fullWidth >
                            <Select color='grey' name="mentor" style= {{ color: '#ffffff'}} onChange={(e)=> {setSelectedBatch(e.target.value)}} >
                            {batches.map((batch) =>
                            (
                                <MenuItem value={batch._id} key={batch._id}>{!batch.isCorporateTraining ? FormatDate(batch.startDate) +' - '+ FormatDate(batch.endDate) : batch.clientName +' - '  +FormatDate(batch.startDate)}</MenuItem>
                            ))}
                            </Select> 
                        </FormControl> : <p className='p-4 text-gray-500 bg-black rounded'>No Active Batches</p>}
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