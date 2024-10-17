'use client'

import { useParams } from 'next/navigation'
import styles from './styles.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import GroupCard from '@/app/components/groupCard/GroupCard';
import { CircularProgress, TextField } from '@mui/material';
import BatchCard from '@/app/components/batchCard/BatchCard';
import Loading from '@/app/components/loading/Loading';
import Button from '@/app/components/button/Button';

const Batches = () =>
{
    const {quizId} = useParams();
    const [ searchValue, setSearchValue ] = useState('')
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

    console.log(quizData)

    return(
        <div className={styles.wrapper}>
            {quizData ?
            <div className={styles.container}>
            <div className={styles.searchbar}>
                <TextField color='grey' className={styles.input} InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} placeholder='Search batches' fullWidth/>
                <button className={styles.clear} onClick={()=>setSearchValue('')}>x</button>
            </div>

             <div className={styles.assignments}>
                {quizData?.group?.map((item)=>
                (
                    <BatchCard level='admin' key={item._id} data={item.batch} participants={item.assignment.length} batchId={item._id}/>
                ))}
            </div> 
            </div> :
            <Loading/>}
        </div>
    )
}

export default Batches