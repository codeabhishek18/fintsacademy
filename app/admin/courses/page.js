'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import CourseCard from '@/app/components/courseCard/CourseCard'
import Button from '@/app/components/button/Button'
import Loading from '@/app/components/loading/Loading'

const Courses = () =>
{
    const [ courses, setCourses ] = useState(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(()=>
    {
       getCourses();
    },[])

    const getCourses = async () =>
    {
        const url = `/api/course`
        const response = await axios.get(url);
        setCourses(response.data);
    }

    const handleSubmit = async (e) =>
    {
        try
        {
            e.preventDefault();
            const url = `/api/course`
            await axios.post(url, courseData)
            getCourses();
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
                <Button label='+ Create Course' action={()=> router.push(`${pathname}/create`)}/>
                <div className={styles.list}>
                    {courses?.map((course) =>
                    (
                        <CourseCard type="admin" course={course}/>
                    ))}
                </div>
            </div> :
            <Loading/>}
        </div>
    )
}

export default Courses