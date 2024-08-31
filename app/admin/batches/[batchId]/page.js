'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import batchStyles from './Batch.module.css'
import { useParams } from 'next/navigation'
import Progress from '@/app/components/progress/Progress'
import SessionCard from '@/app/components/sessionCard/SessionCard'
import Enrollment from '@/app/components/enrollment/Enrollment'

const Batch = () =>
{
    const [ batch, setBatch ] = useState(null);
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

    // console.log(batches)

    return(
        <div className={batchStyles.wrapper}>
            {batch && 
            <div className={batchStyles.container}>
                
                <div className={batchStyles.dashboard}>
                    <div className={batchStyles.progress}>
                        <Progress data={batch}/>
                    </div>
                    <div className={batchStyles.list}>
                        {batch.sessions.map((session, index) =>
                        (
                            <SessionCard 
                                key={session._id} session={session} index={index} 
                                updateSessionStatus={updateSessionStatus} type="admin"
                            />
                        ))}
                    </div>
                </div>

                <div className={batchStyles.enrollments}>
                    {batch.enrollments.length ? 
                    batches.enrollments.map((student)=>
                    (
                        <Enrollment student={student}/>
                    )) : 
                    <p className={batchStyles.noStudents}>No Enrollments</p>
                    }
                </div>

            </div>}
        </div>
    )
}

export default Batch