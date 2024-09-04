'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import CourseForm from '@/app/components/courseForm/CourseForm'
import CourseCard from '@/app/components/courseCard/CourseCard'
import { CircularProgress } from '@mui/material'

const Courses = () =>
{
    const [ courseData, setCourseData ] = useState({title: '', description: ''})
    const [ courses, setCourses ] = useState(null);
    const [ courseForm, setCourseForm ] = useState(false);

    useEffect(()=>
    {
       getCourses();
    },[])

    const getCourses = async () =>
    {
        const url = `/api/course`
        const response = await axios.get(url);
        setCourses(response.data.courses);
    }

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        setCourseData({...courseData, [name] : value})
    }

    const handleSubmit = async (e) =>
    {
        try
        {
            e.preventDefault();
            const url = `/api/course`
            await axios.post(url, courseData)
            getCourses();
            setCourseForm(false)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    const removeCourse = async (id) =>
    {
        try
        {
            const url = `/api/course/${id}`
            const response = await axios.delete(url)
            setCourses(response.data)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return(
        <div className={styles.wrapper}>
            {courses ? <div className={styles.container}>
                <div className={styles.listHeader}>
                    {/* <h1>Courses</h1> */}
                    <button className={styles.add} onClick={()=> setCourseForm(!courseForm)}>{courseForm ? 'close' : '+ Add course' }</button>
                </div>

                {courseForm && 
                <CourseForm
                    data={courseData} 
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit} 
                    setCourseForm={setCourseForm}
                />}

                <div className={styles.list}>
                    {courses?.map((course) =>
                    (
                        <CourseCard type="admin" course={course}/>
                    ))}
                </div>
            </div> :
            <div className={styles.spinner}>
                <CircularProgress sx={{color: '#D4313D'}} />
            </div>}
        </div>
    )
}

export default Courses