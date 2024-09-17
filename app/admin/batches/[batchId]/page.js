'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './Batch.module.css'
import { useParams } from 'next/navigation'
import Progress from '@/app/components/progress/Progress'
import SessionCard from '@/app/components/sessionCard/SessionCard'
import Enrollment from '@/app/components/enrollment/Enrollment'
import { CircularProgress } from '@mui/material'

const Batch = () =>
{
    const [ batch, setBatch ] = useState(null);
    const [ activeAgenda, setActiveAgenda ] = useState(-1);
    const { batchId } = useParams();
   
    const getBatch = async () =>
    {
        const url = `/api/batch/${batchId}`
        const response = await axios.get(url);
        setBatch(response.data);
    }

    useEffect(()=>
    {
       getBatch();
    },[])

    console.log(batch)

     const updateSessionStatus = async (sessionId, status) =>
    {
       
        const updatedStatus = status === 'Upcoming' ? 'Completed' : 'Upcoming'
        const url = `/api/session/${sessionId}`
        await axios.put(url, {status : updatedStatus});
        getBatch();
    }

    // const handleChange = (e) =>
    // {
    //     const {name, value} = e.target;
    //     setBatchData({...batchData, [name] : value})
    // }

    // const handleSubmit = async (e) =>
    // {
    //     try
    //     {
    //         e.preventDefault();
    //         const url = `${baseUrl}/batch/create`
    //         await axios.post(url, batchData)
    //         getBatches();
    //         setBatchForm(false)
    //     }
    //     catch(error)
    //     {
    //         console.log(error)
    //     }
    // }

    // const removeBatch = async (id) =>
    // {
    //     try
    //     {
    //         const url = `${baseUrl}/batch/delete/${id}`
    //         const response = await axios.delete(url, batchData)
    //         setBatches(response.data)
    //     }
    //     catch(error)
    //     {
    //         console.log(error)
    //     }
    // }

    return(
        <div className={styles.wrapper}>
            {batch ?
            <div className={styles.container} onClick={()=> setActiveAgenda(-1)}>
                
                <div className={styles.dashboard}>
                    <div className={styles.progress}>
                        <Progress batchData={batch} level='admin'/>
                    </div>
                    <div className={styles.list}>
                        {batch.sessions.map((session, index) =>
                        (
                            <SessionCard 
                                key={session._id} level="admin"
                                session={session} index={index} 
                                updateSessionStatus={updateSessionStatus} 
                                setActiveAgenda={setActiveAgenda}
                                activeAgenda={activeAgenda}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.enrollments}>
                    {batch.enrollments.length ? 
                    batch.enrollments.map((user)=>
                    (
                        <Enrollment user={user}/>
                    )) : 
                    <p className={styles.noStudents}>No Enrollments</p>
                    }
                </div>

            </div> : <div className={styles.spinner}>
                <CircularProgress sx={{color: '#D4313D'}} />
            </div>}
        </div>
    )
}

export default Batch