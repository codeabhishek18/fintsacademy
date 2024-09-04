'use client'

import Scorecard from '@/app/components/scoreCard/ScoreCard'
import styles from './Scorecard.module.css'
import axios from "axios"
import { useParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { CircularProgress } from '@mui/material'

const Score = () =>
{
    const pathname = usePathname();
    const testId = pathname.split('/')[3]
    const [ testData, setTestData ] = useState(null);
    const  [isLoading, setIsLoading ] = useState(false)

     useEffect(()=>
    {
        getTest();
    },[])

    const getTest = async () =>
    {
        setIsLoading(true)
        const url = `/api/assessment/${testId}`
        const response = await axios.get(url)
        setTestData(response.data);
        setIsLoading(false)
    }

    if(isLoading)
        return(
            <div className={styles.spinner}>
                <CircularProgress sx={{color: '#D4313D'}} />
            </div>    
        )

    return(
        <div className={styles.container}>
            {testData ? <Scorecard data={testData}/> : <></>}
        </div>
    )
}

export default Score