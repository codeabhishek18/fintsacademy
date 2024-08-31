'use client'

import styles from './styles.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

const BillingCard = ({courseId}) =>
{
    const [ course, setCourse ] = useState(null);

    useEffect(()=>
    {
        getCourse();
    },[])

    const getCourse = async () =>
    {
        const url = `/api/course/${courseId}`
        const response = await axios.get(url);
        setCourse(response.data)
    }

    return(
        <div className={styles.container}>
            <p className={styles.header}>PRICE DETAILS</p>
            <div className={styles.group}>
                <p className={styles.left}>Price (1 Item)</p>
                <p className={styles.right}>₹6,000</p>
            </div>
            <div className={styles.group}>
                <p className={styles.left}>Discount</p>
                <p className={styles.right}>₹1,000</p>
            </div>
            <div className={styles.total}>
                <p className={styles.left}>Total Amount</p>
                <p className={styles.right}>₹5,000</p>
            </div>
            <p className={styles.success}>You saved ₹1,000 on this</p>
        </div>
    )
}

export default BillingCard