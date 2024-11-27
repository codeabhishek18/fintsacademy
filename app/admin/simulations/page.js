'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './styles.module.css'
import BatchForm from '@/app/components/batchForm/BatchForm'
import BatchCard from '@/app/components/batchCard/BatchCard'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import SimulationCard from '@/app/components/simulationCard/SimulationCard'

const Simulations = () =>
{
    const [ simulations, setSimulations ] = useState(null);
    const router = useRouter();

    const getSimulations = async () =>
    {
        const url = `/api/course`
        const response = await axios.get(url);
        setSimulations(response.data);
    }

    useEffect(()=>
    {
        getSimulations();
    },[])

    return(
        <div className={styles.wrapper}>
            {simulations ? 
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.add} onClick={()=> router.push('/admin/simulations/create') }>+ Add Trigger</button>
                </div>

                <div className={styles.list}>
                {simulations?.map((simulation) =>
                (
                    <SimulationCard key={simulation._id} data={simulation} />
                ))}
                </div>

            </div> :
            <div className={styles.spinner}>
                <CircularProgress sx={{color: '#D4313D'}} />
            </div>}
        </div>
            
    )
}

export default Simulations