'use client'

import { signOut, useSession } from 'next-auth/react'
import styles from './styles.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

const BillingCard = ({course, selectedBatch}) =>
{
    const router = useRouter();
    const {data, update} = useSession();
    const user = data?.user?.id;
    const session = useSession();
    const [ isLoading, setIsLoading ] = useState(false);

    const handleBuy = async (e) =>
    {
        e.preventDefault();
        try
        {
            const newSession = {...session, user: { ...session?.user, role: 'user'}}
            if(!selectedBatch)
                return toast.error('Batch is required')

            setIsLoading(true);
            const url = `/api/enrollment/${user}`
            const response = await axios.post(url, {batchId : selectedBatch, courseId: course._id});
            await update(newSession);
            setIsLoading(false);
            toast.success(response.data.message);
            router.push('/dashboard');
            localStorage.removeItem('seletedCourse')
        }
        catch(error)
        {
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    return(
        <div className={styles.container}>
            <p className={styles.header}>PRICE DETAILS</p>
            <div className={styles.group}>
                <p className={styles.left}>Price (1 Item)</p>
                <p className={styles.right}>${course.price}</p>
            </div>
            <div className={styles.group}>
                <p className={styles.left}>Discount</p>
                <p className={styles.right}>${course.price - course.offerPrice}</p>
            </div>
            <div className={styles.total}>
                <p className={styles.left}>Total Amount</p>
                <p className={styles.right}>${course.offerPrice}</p>
            </div>
            <p className={styles.success}>You saved ${course.price - course.offerPrice} on this</p>
            {isLoading ? 
            <div className={styles.spinner}>
                <CircularProgress sx={{color: '#D4313D'}} />
            </div> : 
            <button className={styles.buy} onClick={handleBuy}>Register Now</button>}
        </div>
    )
}

export default BillingCard