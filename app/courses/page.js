'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.css' 
import axios from "axios";
import Footer from '@/app/components/footer/Footer';
import { useScheme } from '@/contextapi/SchemeProvider';
import CourseCard from '../components/courseCard/CourseCard';
import ShimmerCourseCard from '../components/shimmerCourseCard/ShimmerCourseCard';
import { shimmerCourseData } from '@/utility/shimmerData';
import Header from '../components/header/Header';

const Courses = () =>
{
    const [ courses, setCourses] = useState(null);
    const [ error, setError ] = useState(false);
    const { scheme } = useScheme();
    
    useEffect(()=>
    {
        getCourses();
    },[]);

    const getCourses = async () =>
    {
        try
        {
            const url = '/api/course'
            const response = await axios.get(url);
            if(response?.data?.courses)
            {
                setCourses(response.data.courses);
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
    <div className={styles.wrapper}>
        <Header/>
        <div className={styles.container}>
            <div className={styles.courseWrapper}>
                {courses ? 
                <div className={styles.courses}>
                {courses.map((course)=>
                (
                    <CourseCard course={course} key={course._id}/>
                ))}
                </div> :
                (error ? <></> :
                <div className={styles.courses}>
                {shimmerCourseData.map((data, index)=>
                (
                    <ShimmerCourseCard key={data.id}/>
                ))}
                </div>)}
            </div>
        </div>
        <Footer/>
    </div>
    )
    
}

export default Courses