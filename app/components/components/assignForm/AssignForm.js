'use client'

import { useEffect, useState } from 'react';
import styles from './AssignForm.module.css'
import axios from 'axios';
import QuizKey from '../quizKey/QuizKey';

const AssignForm = ({quiz}) =>
{
    const [ assign, setAssign ] = useState('');
    const [ batch, setBatch ] = useState('');
    const [ batches, setBatches ] = useState([])
    const [ course, setCourse ] = useState('');
    const [ courses, setCourses ] = useState([])
    const [ batchType, setBatchType ] = useState('');
    const [ selectedBatch, setSelectedBatch ] = useState([]);
    const [ keyList, setKeyList ] = useState([]);

    useEffect(()=>
    {
        getBatches();
        getCourses();
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

    const getCourses = async () =>
    {
        const url = '/api/course';
        const response = await axios.get(url);
        setCourses(response.data)
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
            selectedBatch.enrollments.forEach((user)=>
            {
                users.push(user._id);
            })
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
            const url = `/api/user/quiz/${quiz._id}`
            await axios.post(url, {users, batch});
        }
        catch(error)
        {
            console.log(error);
        }   
    }

    console.log(selectedBatch)

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.head}>{quiz.title}</h1>
                {keyList?.length>0 && <div className={styles.assigned}>
                {keyList.map((keyword)=>
                (
                    <QuizKey type="edit" id={keyword.id} keyword={keyword.name} handleKeywords={handleKeywords} removeKeyWord={removeKeyWord}/>
                ))}
                </div>}
                <select className={styles.input} value={assign} onChange={(e)=> setAssign(e.target.value)}>
                    <option value="">Assign to</option>
                    <option value="courses">Courses</option>
                    <option value="batches">Batches</option>
                </select>
                {assign === "batches" &&
                <select className={styles.input} value={batch} onChange={(e)=> setBatch(e.target.value)}>
                    <option value="">Choose Batch</option>
                    {batches.map((batch)=>
                    (
                        <option value={batch._id} key={batch._id}>{batch.title}</option>
                    ))}
                </select>}
                {assign === "batches" && 
                <select className={styles.input} value={batchType} onChange={(e)=> setBatchType(e.target.value)}>
                    <option value="">Batch type</option>
                    <option value="all">All</option>
                    <option value="selected">Selected</option>
                </select>}
                {assign === "batches" && batchType === "selected" &&
                <div className={styles.enrollments}>
                    {selectedBatch.enrollments.map((user)=>
                    (
                        <QuizKey type="read" selectedId={user._id} keyword={user.firstname +' ' +user.lastname} handleKeywords={handleKeywords} removeKeyWord={removeKeyWord}/>
                    ))}
                </div>}
                {assign === "courses" && 
                <select name="course" className={styles.input} value={course} onChange={(e)=> setCourse(e.target.value)}>
                    <option value="">Choose Course</option>
                    {courses.map((course)=>
                    (
                        <option value={course._id} key={course._id}>{course.title}</option>
                    ))}
                </select>}
                <button className={styles.post} onClick={handleAssign}>Assign</button>
            </div>
        </div>
    )
}

export default AssignForm