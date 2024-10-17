'use client'

import Image from 'next/image'
import styles from './styles.module.css'
import Lecturecard from '../lectureCard/LectureCard'
import { Rating } from '@mui/material'
import { useScheme } from '@/contextapi/SchemeProvider'
import { useRouter } from 'next/navigation'
import Button from '../button/Button'

const CourseDetail = ({course}) =>
{
    const { scheme } = useScheme();
    const router = useRouter();

    const handleClick = () =>
    {
        localStorage.setItem('selectedCourse', course.id)
        router.push('/checkout')
    }

    return (
        <div className={scheme === 'dark' ? styles.container : `${styles.container} ${styles.light}`}>
            <div className={styles.coverWrapper}>
                <Image className={styles.coverImage} src={course.imageURL} alt={course.title} layout='fill'/>
            </div>
            
            <div className={styles.header}>
                <p className={styles.title}>{course.title}</p>
                <p className={styles.level}>{course.level}</p>
                <p className={styles.description}>{course.description}</p>
            </div>

            <div className={styles.lectures}>
                {course.lectures.map((lecture, index)=>
                (
                    <Lecturecard key={lecture._id} lecture={lecture} index={index}/>
                ))}
            </div>  

            <div className={styles.footer}>
                <Button label='Join Now' action={handleClick}/>
                {/* <Rating name="half-rating-read" defaultValue={4.7} precision={0.5} readOnly size='large'/> */}
            </div>          
        </div>
    )
}

export default CourseDetail