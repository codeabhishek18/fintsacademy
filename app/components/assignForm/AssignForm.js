'use client'

import { useEffect, useState } from 'react';
import styles from './AssignForm.module.css'
import axios from 'axios';
import QuizKey from '../quizKey/QuizKey';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'sonner';

const AssignForm = ({quiz, setAssignForm}) =>
{
    const [ batch, setBatch ] = useState(null);
    const [ batches, setBatches ] = useState(null)
    const [ batchType, setBatchType ] = useState('');
    const [ selectedBatch, setSelectedBatch ] = useState(null);
    const [ keyList, setKeyList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showAssignees, setShowAssignees ] = useState(true); 

    console.log(batches)

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
        try
        {   
            setIsLoading(true);
            const url = `/api/batch/course/${quiz.course._id}`;
            const response = await axios.get(url);
            setBatches(response.data)
            setIsLoading(false);
        }
        catch(error)
        {
            toast.error(error.message);
            setIsLoading(false)
        }
    }

    const getBatch = async () =>
    {
        if(!batch)
            return

        try
        {
            const url = `/api/batch/${batch}`
            const response = await axios.get(url);
            const enrollmentSize = response.data.enrollments;
            if(!enrollmentSize?.length)
                setShowAssignees(false);
            setSelectedBatch(response.data);
        }
        catch(error)
        {
            toast.error(error.message)
        }
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

        if(!batch)
            return toast.error('Batch is required')

        if(!users.length)
            return toast.error('Assignees are required')

        try
        {
            const url = `/api/quiz/${quiz._id}`
            const response = await axios.post(url, {users, batch});
            toast.success(response.data.message)
            setAssignForm(false);
        }
        catch(error)
        {
            toast.error(error.message);
        }   
    }

    console.log(batches)

    return(
        <div className={styles.wrapper}>
            {isLoading ? 
            <div>
                <CircularProgress sx={{color: '#D4313D'}}/>
            </div> :
            (batches ?
            <div className={styles.container}>
                <h1 className={styles.head}>{quiz.course.title}</h1>
                <p className={styles.level}>{quiz.course.level}</p>
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
                    {batches.map((batch) =>
                    (
                        <MenuItem value={batch.title} key={batch._id}>{batch.title}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                
                {showAssignees && <FormControl className={styles.input} fullWidth>
                    <InputLabel size='small' color='grey' sx={{color: 'grey'}} >Assign to</InputLabel>
                    <Select size='small' color='grey'  sx={{color: 'grey'}} name="batch" InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} label="Assign to" value={batchType} onChange={(e)=> {setBatchType(e.target.value); e.target.value === 'all' && setKeyList([])}}>
                        <MenuItem value='all'>All</MenuItem>
                        <MenuItem value='selected'>Selected</MenuItem>
                    </Select>
                </FormControl>}

                {!showAssignees && <p>No Enrollments</p>}
                
                {batchType === "selected" && selectedBatch &&
                <div className={styles.enrollments}>
                    {selectedBatch.enrollments.map((user)=>
                    (
                        <QuizKey type="read" selectedId={user._id} keyword={user.name} handleKeywords={handleKeywords} removeKeyWord={removeKeyWord}/>
                    ))}
                </div>}

                {showAssignees && <button className={styles.post} onClick={handleAssign}>Assign</button> }
                <p className={styles.close} onClick={()=> setAssignForm(false)}>x</p>
            </div> : 
            <div className={styles.container}>
                <p>No Batches Found</p>
                <p className={styles.close} onClick={()=> setAssignForm(false)}>x</p>
            </div>)}
        </div>
    )
}

export default AssignForm