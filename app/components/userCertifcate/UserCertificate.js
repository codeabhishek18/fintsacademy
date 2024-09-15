'use client'

import Image from "next/image"
import styles from './styles.module.css'
import certificate from '@/assets/certificate.png'
import { useSession } from "next-auth/react"

const UserCertificate = ({course, date, divRef}) =>
{
    const { data } = useSession();
    
    return(
        <div className={styles.container} ref={divRef}>
            <p className={styles.name}>{data.user.name}</p>
            <p className={styles.course}>{course.title +' ' +course.level}</p>
            <p className={styles.date}>{new Date(date).toLocaleDateString()}</p>
            <Image className={styles.certificate} src={certificate} alt='certificate'/>
        </div>
    )
}

export default UserCertificate

