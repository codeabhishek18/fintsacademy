'use client'

import { useEffect, useState } from 'react';
import styles from './AssignForm.module.css'
import axios from 'axios';
import QuizKey from '../quizKey/QuizKey';
import { FormControl, MenuItem, Select } from '@mui/material';
import { toast } from 'sonner';
import Label from '../label/Label';
import CloseDialog from '../closeDialog/CloseDialog';
import Button from '../button/Button';
import Loading from '../loading/Loading';

const AssignForm = ({quiz, setAssignForm}) =>
{
    const [ batch, setBatch ] = useState('');
    const [ batches, setBatches ] = useState(null)
    const [ batchType, setBatchType ] = useState('');
    const [ group, setGroup ] = useState(null);
    const [ selectedBatch, setSelectedBatch ] = useState(null);
    const [ keyList, setKeyList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showAssignees, setShowAssignees ] = useState(true); 
    const [ warningMessage, setWarningMessage ] = useState(null);
    const [ isDup, setIsDup ] = useState([]);

    useEffect(()=>
    {
        getBatches();
    },[])

    useEffect(()=>
    {
        getBatch();
    },[batch]);

    useEffect(()=>
    {   
        if(!batch)
            return

        setShowAssignees(true);
        setWarningMessage(null);
        checkAssignment(selectedBatch.enrollments)
    },[batchType])

    const getBatches = async () =>
    {
        try
        {   
            setIsLoading(true);
            const url = `/api/course/${quiz.course.id}`;
            const response = await axios.get(url);
            setBatches(response.data.batches)
            setIsLoading(false);
        }
        catch(error)
        {
            toast.error(error.message);
            setIsLoading(false)
        }
    }

    const checkAssignment = (enrollments) =>
    {
        if(!enrollments?.length)
        {
            setShowAssignees(false);
            setWarningMessage(`${batch} has no enrollments as of now`)
            return
        }

        if(enrollments.length && batchType === 'all')
        {
            setShowAssignees(false);
            setWarningMessage(`This quiz cannot be assigned to everyone in ${batch} `);
            return
        } 

        const isBatchAlreadyAssigned = quiz.group.find((pack) => pack.batch.title === batch);
        if(enrollments.length === isBatchAlreadyAssigned.assignment.length)
        {
            setShowAssignees(false);
            setWarningMessage(`This quiz is already assigned to everyone in ${batch} `);
            return
        } 
        
        const quizAssignees = isBatchAlreadyAssigned.assignment.map((assign) => assign.user);
        setIsDup(quizAssignees);
    }

    const getBatch = async () =>
    {
        if(!batch)
            return

        try
        {
            const url = `/api/batch/${batch}`
            const response = await axios.get(url);
            setSelectedBatch(response.data);  
            const enrollments = response.data.enrollments;
            checkAssignment(enrollments);
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

    return(
        <div className={styles.wrapper}>
            {isLoading ? 
            <Loading/> :
            (batches ?
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{quiz.course.title}</h1>
                    <p className={styles.level}>{quiz.course.level}</p>    
                </div>
                {keyList?.length>0 && 
                <div className={styles.assigned}>
                    {keyList.map((keyword)=>
                    (
                        <QuizKey type="edit" id={keyword.id} keyword={keyword.name} handleKeywords={handleKeywords} removeKeyWord={removeKeyWord}/>
                    ))}
                </div>}

                <Label label="Choose batch"/>
                <FormControl className={styles.input} fullWidth>
                    <Select size='small' color='grey' sx={{color:'white'}} className={styles.input} name="batch" value={batch} onChange={(e)=> setBatch(e.target.value)}>
                    {batches.map((batch) =>
                    (
                        <MenuItem value={batch.title} key={batch._id}>{batch.title}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                
                <Label label="Assign to"/>
                <FormControl className={styles.input}  fullWidth>
                    <Select size='small' color='grey' sx={{color:'white'}} className={styles.input} name="batchType" value={batchType} onChange={(e)=> {setBatchType(e.target.value); e.target.value === 'all' && setKeyList([])}}>
                        <MenuItem value='all'>All</MenuItem>
                        <MenuItem value='selected'>Selected</MenuItem>
                    </Select>
                </FormControl>

                {!showAssignees && <p className={styles.warning}>{warningMessage}</p>}
                
                {batchType === "selected" && selectedBatch && showAssignees &&
                <div className={styles.enrollments}>
                    {selectedBatch.enrollments.map((user)=>
                    (
                        <QuizKey type="read" key={user._id} isDup={isDup} selectedId={user._id} keyword={user.name} handleKeywords={handleKeywords} removeKeyWord={removeKeyWord}/>
                    ))}
                </div>}

                {showAssignees  && <Button label='Assign' fullwidth={true} action={()=> handleAssign}/>}
                <CloseDialog action={()=> setAssignForm(false)}/>
            </div> : 
            <div className={styles.container}>
                <p>No Batches Found</p>
            </div>)}
        </div>
    )
}

export default AssignForm