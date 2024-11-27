'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.css' 
import axios from "axios";
import { useParams } from 'next/navigation';
import CourseDetail from '@/app/components/courseDetail/CourseDetail';
import Footer from '@/app/components/footer/Footer';
import ShimmerCourseDetail from '@/app/components/shimmerCourseDetail/shimmerCourseDetail';
import Header from '@/app/components/header/Header';
import { toast } from 'sonner';

const Course = () =>
{
    const [ courseData, setCourseData ] = useState(null);
    const { courseId } = useParams();
    const [ isLoading, setIsLoading ] = useState(false);
    
    useEffect(()=>
    {
        getCourses();
    },[]);

    console.log(courseData);

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