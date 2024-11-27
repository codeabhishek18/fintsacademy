'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './Batch.module.css'
import { useParams } from 'next/navigation'
import Progress from '@/app/components/progress/Progress'
import SessionCard from '@/app/components/sessionCard/SessionCard'
import Enrollment from '@/app/components/enrollment/Enrollment'
import { CircularProgress } from '@mui/material'
import simulation from '@/assets/simulation.png'
import next from '@/assets/next.png'
import { toast } from 'sonner'
import Image from 'next/image'
import Button from '@/app/components/button/Button'

const Batch = () =>
{
    const [ batch, setBatch ] = useState(null);
    const [ activeAgenda, setActiveAgenda ] = useState(-1);
    const { batchId } = useParams();
    const [ showResponses, setShowResponses ] = useState(false);
    const [ active, setActive ] = useState(0);
   
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

    console.log(batch);

     const updateSessionStatus = async (sessionId, status) =>
    {
       
        const updatedStatus = status === 'Upcoming' ? 'Completed' : 'Upcoming'
        const url = `/api/session/${sessionId}`
        await axios.put(url, {status : updatedStatus});
        getBatch();
        toast.success(`Session updated to ${updatedStatus}`)
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

    console.log(batch)

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

                    <Button label='Simulation Responses' fullwidth={true} action={()=> setShowResponses(true)}/>
                    {showResponses && 
                    <div className="h-[100vh] z-50 w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,1'}} >
                        <div className='h-[80vh] w-[90vw]'>
                            <div className='flex items-center gap-2'>
                                {batch.course.simulation.map((simulation, index)=>
                                (
                                    <Button label={`Trigger ${index+1}`} action={()=> setActive(index)}/>
                                ))}
                            </div>
                            <div className='flex gap-4 w-full text-white mt-8 overflow-y-scroll'>
                                <h1 className='absolute top-6 right-4 text-red-600 text-4xl font-bold cursor-pointer' onClick={()=> setShowResponses(false)}>X</h1>
                                <div className='w-[40%] min-h-72 border p-4 rounded'>
                                    {batch.course.simulation[active].description}
                                </div>
                                <div className='w-[60%] p-4 rounded border flex flex-col gap-4'>
                                    {batch.enrollments.map((enrollment)=>
                                    (
                                        <div>
                                            {enrollment.simulation[active].response && 
                                            <div>
                                                <p className='text-red-600 font-bold mb-2'>{enrollment.user.name}</p>
                                                <p>{enrollment.simulation[active].response}</p>
                                            </div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>}

                </div>

                <div className={styles.enrollments}>
                    {batch.enrollments.length ? 
                    batch.enrollments.map((enrollment)=>
                    (
                        <Enrollment enrollment={enrollment} key={enrollment._id}/>
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