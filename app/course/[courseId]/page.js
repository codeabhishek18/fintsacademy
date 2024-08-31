'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.css' 
import axios from "axios";
import { useParams, useRouter } from 'next/navigation';
import CourseDetail from '@/app/components/courseDetail/CourseDetail';
import Footer from '@/app/components/footer/Footer';
import fints from '@/assets/fints.png'
import Image from 'next/image';
import ShimmerCourseDetail from '@/app/components/shimmerCourseDetail/shimmerCourseDetail';
import { useScheme } from '@/contextapi/SchemeProvider';
import Switch from '@/app/components/themeSwitch/Switch';
import ErrorDialogue from '@/app/components/errorDialogue/ErrorDialogue';

const Course = () =>
{
    const [ courseData, setCourseData ] = useState(null);
    const [ error, setError ] = useState(false);
    const { courseId } = useParams();
    const router = useRouter();
    const { scheme } = useScheme();
    
    useEffect(()=>
    {
        getCourses();
    },[]);

    const getCourses = async () =>
    {
        try
        {
            const url = `/api/course/${courseId}`
            const response = await axios.get(url);
            console.log(response)
            if(response?.data?.course)
            {
                setCourseData(response.data.course);
                return 
            }
            setError(true); 
        }
        catch(error)
        {
            setError(true); 
        }
    }

    return(
        <div className={scheme === 'dark' ? styles.wrapper : `${styles.wrapper} ${styles.light}`}>
            {error && <ErrorDialogue setError={setError} type='away'/>}
            <div className={styles.navbar}>
                <Image className={styles.fints} src={fints} alt='fints' onClick={()=> router.push('/')}/>
                {/* <Switch/> */}
            </div>
            <div className={styles.container}>
                {courseData ?
                <CourseDetail course={courseData}/> :
                (error ? <></> : <ShimmerCourseDetail/>)}
            </div>
            <Footer/>
        </div>
    )
    
}

export default Course