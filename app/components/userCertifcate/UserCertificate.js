'use client'

import Image from "next/image"
import styles from './styles.module.css'
import certificate from '@/assets/certificate.png'
import corporateCertificate from '@/assets/corporateCertificate.png'
import { useSession } from "next-auth/react"
import axios from "axios"
import { useEffect, useState } from "react"


const UserCertificate = ({course, userName, batchData, divRef}) =>
{
    const { data } = useSession();

    // useEffect(()=>
    // {
    //     getUserData()
    // },[])

    // const getUserData = async () =>
    // {
    //     try
    //     {
    //         const url = `/api/user/${data.user.id}`
    //         const response = await axios.get(url);
    //         setUserData(response.data)
    //     }
    //     catch(error)
    //     {
    //         toast.error(error.message);
    //     }
    //     finally
    //     {
    //         setIsLoading(false);
    //     }
    // }
    
    return(
        <div className={styles.container} ref={divRef}>
            <p className={styles.name}>{userName.toUpperCase()}</p>
            <p className={styles.course}>{course.title.toUpperCase()}</p>
            <p className={styles.date}>{new Date().toLocaleDateString()}</p>
            <Image className={styles.certificate} src={batchData.isCorporateTraining ? corporateCertificate : certificate} alt='certificate'/>
        </div>
    )
}

export default UserCertificate

