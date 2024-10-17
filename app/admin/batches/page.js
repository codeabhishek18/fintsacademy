'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './styles.module.css'
import BatchForm from '@/app/components/batchForm/BatchForm'
import BatchCard from '@/app/components/batchCard/BatchCard'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'

const Batches = () =>
{
    const [ batches, setBatches ] = useState(null);
    const router = useRouter();

    const getBatches = async () =>
    {
        const url = `/api/batch`
        const response = await axios.get(url);
        setBatches(response.data);
    }

    useEffect(()=>
    {
        getBatches();
    },[])

    return(
        <div className={styles.wrapper}>
            {batches ? 
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.add} onClick={()=> router.push('/admin/batches/create') }>+ Add Batch</button>
                </div>

                <div className={styles.list}>
                    {batches?.map((batch) =>
                    (
                        <BatchCard type="batch" level="admin" key={batch._id} data={batch} getBatches={getBatches}/>
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