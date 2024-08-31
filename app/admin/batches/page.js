'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './styles.module.css'
import BatchForm from '@/app/components/batchForm/BatchForm'
import BatchCard from '@/app/components/batchCard/BatchCard'

const Batches = () =>
{
    const [ courses, setCourses ] = useState([]);
    const [ batches, setBatches ] = useState([]);
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
        console.log(batches)
        setBatches(response.data.batches);
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
            <div className={styles.container}>

                <div className={styles.header}>
                    <button className={styles.add} onClick={()=> setBatchForm(!batchForm)}>{batchForm ? 'close' : '+ Add Batch'}</button>
                </div>

                {batchForm && 
                <BatchForm courses={courses} />}

                <div className={styles.list}>
                    {batches?.map((batch) =>
                    (
                        <BatchCard type="admin" key={batch._id} data={batch} removeBatch={removeBatch}/>
                    ))}
                </div>

            </div>
    )
}

export default Batches