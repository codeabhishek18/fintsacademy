'use client'

import { useParams } from 'next/navigation'
import styles from './styles.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import GroupCard from '@/app/components/groupCard/GroupCard';
import { CircularProgress, TextField } from '@mui/material';
import BatchCard from '@/app/components/batchCard/BatchCard';

const Batches = () =>
{
    const {quizId} = useParams();
    const [ quizData, setQuizData ] = useState(null);

    useEffect(()=>
    {
        getQuiz();
    },[])

    const getQuiz = async () =>
    {
        const url = `/api/quiz/${quizId}`
        const response = await axios.get(url)
        setQuizData(response.data)
    }

    return(
        <div className={styles.wrapper}>
            {quizData ?
            <div className={styles.container}>
            <div className={styles.searchbar}>
                <TextField color='grey' size='small' className={styles.input} InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} placeholder='Search batches' fullWidth/>
                <button className={styles.search}>Search</button>
            </div>

             <div className={styles.assignments}>
                {quizData?.group?.map((item)=>
                (
                    <BatchCard level='admin' key={item._id} data={item.batch} participants={item.assignments} batchId={item._id}/>
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