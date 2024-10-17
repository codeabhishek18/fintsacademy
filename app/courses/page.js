'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.css' 
import axios from "axios";
import Footer from '@/app/components/footer/Footer';
import CourseCard from '../components/courseCard/CourseCard';
import ShimmerCourseCard from '../components/shimmerCourseCard/ShimmerCourseCard';
import { shimmerCourseData } from '@/utility/shimmerData';
import Header from '../components/header/Header';
import { toast } from 'sonner';

const Courses = () =>
{
    const [ courses, setCourses] = useState(null);
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
            const url = '/api/course'
            const response = await axios.get(url);
            setCourses(response.data);
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
            <div className={styles.courseWrapper}>
                {isLoading ? 
                <div className={styles.courses}>
                {shimmerCourseData.map((data, index)=>
                (
                    <ShimmerCourseCard key={data.id}/>
                ))}
                </div> :
                (courses ? 
                <div className={styles.courses}>
                    {courses.map((course)=>
                    (
                        <CourseCard course={course} key={course._id}/>
                    ))}
                </div> : <></>)}
            </div>
        </div>
        <Footer/>
    </div>
    )
    
}

export default Courses