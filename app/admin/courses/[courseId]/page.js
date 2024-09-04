'use client'

import { CircularProgress } from '@mui/material'
import styles from './styles.module.css'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Lecturecard from '@/app/components/lectureCard/LectureCard';
import LectureForm from '@/app/components/lectureForm/LectureForm';

const Course = () =>
{

    const {courseId} = useParams();
    const [ course, setCourse ] = useState(null);
    const [ lectureForm, setLectureForm ] = useState(false);

    useEffect(()=>
    {
       getCourse();
    },[])

    const getCourse = async () =>
    {
        const url = `/api/course/${courseId}`
        const response = await axios.get(url);
        setCourse(response.data.course);
    }

    const removeCourse = async (id) =>
    {
        try
        {
            const url = `/api/lecture/${id}`
            await axios.delete(url)
            getCourse();
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return(
        <div className={styles.wrapper}>
        {course ? 
        <div className={styles.container}>
            <div className={styles.listHeader}>
                {/* <h1>Courses</h1> */}
                <button className={styles.add} onClick={()=> setLectureForm(!lectureForm)}>{lectureForm ? 'close' : '+ Add Lecture' }</button>
            </div>

            {lectureForm && <LectureForm courseId={course._id}/>}

            <div className={styles.list}>
                {course.lectures?.map((lecture, index) =>
                (
                    <Lecturecard lecture={lecture} index={index}/>
                ))}
            </div>
        </div> :
        <div className={styles.spinner}>
            <CircularProgress sx={{color: '#D4313D'}} />
        </div>}
    </div>
    )
}

export default Course