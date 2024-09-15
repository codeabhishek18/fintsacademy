'use client'

import { useEffect, useState } from 'react';
import styles from './AssignForm.module.css'
import axios from 'axios';
import QuizKey from '../quizKey/QuizKey';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const AssignForm = ({quiz, setAssignForm}) =>
{
    const [ batch, setBatch ] = useState('');
    const [ batches, setBatches ] = useState([])
    const [ batchType, setBatchType ] = useState('');
    const [ selectedBatch, setSelectedBatch ] = useState(null);
    const [ keyList, setKeyList ] = useState([]);

    useEffect(()=>
    {
        getBatches();
    },[])

    useEffect(()=>
    {
        getBatch();
    },[batch])

    const getBatches = async () =>
    {
        const url = '/api/batch';
        const response = await axios.get(url);
        setBatches(response.data)
    }

    const getBatch = async () =>
    {
        const url = `/api/batch/${batch}`
        const response = await axios.get(url);
        setSelectedBatch(response.data);
    }

    const handleKeywords = (name, id) =>
    {
        let search = keyList.filter((key) => key.id === id);
        if(!search.length)
            setKeyList((prev) => [...prev, {id, name}])
    }

    const removeKeyWord = (id) =>
    {
        const newList = keyList.filter((key)=> key.id!==id );
        setKeyList(newList)
    }

    const handleAssign = async () =>
    {
        const users = [];
        if(batchType === "all")
        {
            {selectedBatch && selectedBatch.enrollments.forEach((user)=>
            {
                users.push(user._id);
            })}
        }
        else
        {
            keyList.forEach((key)=>
            { 
                users.push(key.id);
            })
        }

        try
        {
            const url = `/api/quiz/${quiz._id}`
            await axios.post(url, {users, batch});
            setAssignForm(false)
        }
        catch(error)
        {
            console.log(error);
        }   
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.head}>{quiz.title}</h1>
                {keyList?.length>0 && 
                <div className={styles.assigned}>
                    {keyList.map((keyword)=>
                    (
                        <QuizKey type="edit" id={keyword.id} keyword={keyword.name} handleKeywords={handleKeywords} removeKeyWord={removeKeyWord}/>
                    ))}
                </div>}

                <FormControl className={styles.input} fullWidth>
                    <InputLabel size='small' color='grey' sx={{color: 'grey'}} variant='outlined'>Choose batch</InputLabel>
                    <Select size='small' color='grey' sx={{color: 'grey'}} placeholder="Multiple answers" InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} name="batch" label="Choose course" value={batch} onChange={(e)=> setBatch(e.target.value)}>
                    {batches?.map((batch) =>
                    (
                        <MenuItem value={batch.title} key={batch._id}>{batch.title}</MenuItem>
                    ))}
                    </Select>
                </FormControl>

                <FormControl className={styles.input} fullWidth>
                    <InputLabel size='small' color='grey' sx={{color: 'grey'}} >Assign to</InputLabel>
                    <Select size='small' color='grey'  sx={{color: 'grey'}} name="batch" InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} label="Choose course" value={batchType} onChange={(e)=> {setBatchType(e.target.value); e.target.value === 'all' && setKeyList([])}}>
                        <MenuItem value='all'>All</MenuItem>
                        <MenuItem value='selected'>Selected</MenuItem>
                    </Select>
                </FormControl>
                
                {batchType === "selected" && selectedBatch &&
                <div className={styles.enrollments}>
                    {selectedBatch.enrollments.map((user)=>
                    (
                        <QuizKey type="read" selectedId={user._id} keyword={user.name} handleKeywords={handleKeywords} removeKeyWord={removeKeyWord}/>
                    ))}
                </div>}

                <button className={styles.post} onClick={handleAssign}>Assign</button> 
                <p className={styles.close} onClick={()=> setAssignForm(false)}>x</p>
            </div>
        </div>
    )
}

export default AssignForm