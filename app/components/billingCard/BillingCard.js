'use client'

import { useSession } from 'next-auth/react'
import styles from './styles.module.css'
import axios from 'axios';

const BillingCard = ({batch}) =>
{
    const session = useSession();
    const user = session?.data?.user?.id;

    const handleBuy = async (e) =>
    {
        e.preventDefault();
        try
        {
            const url = `/api/enrollments/${user}`
            const response = await axios.post(url, {batchId: batch._id})
            console.log(response);
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return(
        <div className={styles.container}>
            <p className={styles.header}>PRICE DETAILS</p>
            <div className={styles.group}>
                <p className={styles.left}>Price (1 Item)</p>
                <p className={styles.right}>${batch.course.price}</p>
            </div>
            <div className={styles.group}>
                <p className={styles.left}>Discount</p>
                <p className={styles.right}>${batch.course.price - batch.course.offerPrice}</p>
            </div>
            <div className={styles.total}>
                <p className={styles.left}>Total Amount</p>
                <p className={styles.right}>${batch.course.offerPrice}</p>
            </div>
            <p className={styles.success}>You saved ${batch.course.price - batch.course.offerPrice} on this</p>
            <button className={styles.buy} onClick={handleBuy}>Buy Now</button>
        </div>
    )
}

export default BillingCard