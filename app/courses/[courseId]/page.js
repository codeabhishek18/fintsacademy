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
import ErrorDialogue from '@/app/components/errorDialogue/ErrorDialogue';
import Header from '@/app/components/header/Header';
import { toast } from 'sonner';

const Course = () =>
{
    const [ courseData, setCourseData ] = useState(null);
    const { courseId } = useParams();
    const router = useRouter();
    const [ isLoading, setIsLoading ] = useState(false);
    
    useEffect(()=>
    {
        getCourses();
    },[]);

    const getCourses = async () =>
    {
        try
        {
            setIsLoading(true);
            const url = `/api/course/${courseId}`
            const response = await axios.get(url);
            setCourseData(response.data);
            setIsLoading(false);
        }
        catch(error)
        {
            setIsLoading(false);
            toast.error(error.message); 
        }
    }

    return(
        <div className={styles.wrapper}>
            <Header/>
            <div className={styles.container}>
                {isLoading ? 
                <ShimmerCourseDetail/> :
                (courseData ? <CourseDetail course={courseData}/>:  <></>)}
            </div>
            <Footer/>
        </div>
    )
    
}

export default Course