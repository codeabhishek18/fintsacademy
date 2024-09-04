'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './styles.module.css'
import BatchForm from '@/app/components/batchForm/BatchForm'
import BatchCard from '@/app/components/batchCard/BatchCard'
import { CircularProgress } from '@mui/material'

const Batches = () =>
{
    const [ courses, setCourses ] = useState(null);
    const [ batches, setBatches ] = useState(null);
    const [ batchForm, setBatchForm ] = useState(false)

    const getCourses = async () =>
    {
        const url = `/api/course`
        const response = await axios.get(url);
        setCourses(response.data.courses);
    }

    const getBatches = async () =>
    {
        const url = `/api/batch`
        const response = await axios.get(url);
        setBatches(response.data);
    }

    useEffect(()=>
    {
        getCourses();
        getBatches();
    },[])

    const removeBatch = async (id) =>
    {
        try
        {
            const url = `/api/batch/${id}`
            await axios.delete(url, batchData)
            setBatches(response.data)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return(
        <div className={styles.wrapper}>
            {batches ? 
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.add} onClick={()=> setBatchForm(!batchForm)}>{batchForm ? 'close' : '+ Add Batch'}</button>
                </div>

                {batchForm && <BatchForm courses={courses} />}

                <div className={styles.list}>
                    {batches?.map((batch) =>
                    (
                        <BatchCard type="batch" level="admin" key={batch._id} data={batch} removeBatch={removeBatch}/>
                    ))}
                </div>

            </div> :
            <div className={styles.spinner}>
                <CircularProgress sx={{color: '#D4313D'}} />
            </div>}
        </div>
            
    )
}

export default Batches