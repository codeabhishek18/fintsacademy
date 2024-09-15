'use client'

import axios from 'axios'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import EnrollmentBarGraph from '@/app/components/enrollmentBarGraph/EnrollmentBarGraph'

const barGraphData = (data) =>
{
    const formattedData = data.map(item => 
    ({
        month: getMonthName(item._id), // convert _id (1-12) to month name
        enrollments: item.count
    }));

    return formattedData
}
  
function getMonthName(monthIndex) 
{
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    return monthNames[monthIndex - 1];
}

const Dashboard = () =>
{
    const [ courses, setCourses ] = useState(null);
    const [ batches, setBatches ] = useState(null);
    const [ currentMonthEnrollments, setCurrentMonthEnrollments ] = useState(null);
    const [ prevMonthEnrollments, setPrevMonthEnrollments ] = useState(null);
    const [ enroll, setEnroll ] = useState(null);
    const [ graphData, setGraphData ] = useState(null);
 
    const getCourses = async () =>
    {
        try
        {
            const url = `/api/course`
            const response = await axios.get(url);
            setCourses(response.data.courses);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const getBatches = async () =>
    {
        try
        {
            const url = `/api/batch`
            const response = await axios.get(url);
            const activeBatches = response.data.filter((batch)=> batch.status !== 'Completed')
            setBatches(activeBatches);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const getEnrollments = async () =>
    {
        try
        {
            const url = `/api/user/enrollments`
            const response = await axios.get(url);
            setCurrentMonthEnrollments(response.data[0].count)
            setPrevMonthEnrollments(response?.data[1]?.count ? response.data[1].count :  0)
            setEnroll(response.data);
            const graphData = barGraphData(response.data);
            setGraphData(graphData);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>
    {   
        getCourses();
        getBatches();
        getEnrollments();
    },[])

    graphData && console.log(graphData)

    return(
        <div className={styles.wrapper}>
            {courses && batches &&
            <div className={styles.container}>
                <div className={styles.card}>
                    <p className={styles.header}>Active courses</p>
                    <p className={styles.count}>{courses.length}</p>
                </div>
                <div className={styles.card}>
                    <p className={styles.header}>Active batches</p>
                    <p className={styles.count}>{batches.length}</p>
                </div>
                <div className={styles.card}>
                    <p className={styles.header}>Enrollments this month</p>
                    <p className={styles.count}>{currentMonthEnrollments}</p>
                </div>
                <div className={styles.card}>
                    <p className={styles.header}>Growth</p>
                    <p className={styles.count}>+{Math.floor((currentMonthEnrollments - prevMonthEnrollments)/(prevMonthEnrollments === 0 ? 1 : prevMonthEnrollments))*100}%</p>
                </div>
            </div>}
            {/* {graphData && 
            <div className={styles.barGraph}>
                <EnrollmentBarGraph data={graphData}/>
            </div>} */}
        </div>
    )
}

export default Dashboard