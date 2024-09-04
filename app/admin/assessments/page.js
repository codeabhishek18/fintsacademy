'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addQuestion, updateQuestion } from '@/store/slices/quizmakerReducer'
import QuizmakerCard from '@/app/components/quizmakerCard/QuizmakerCard'
import QuizCard from '@/app/components/quizCard/QuizCard'
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

const Assessments = () =>
{
    const quizData = useSelector((state) => state.quizmaker.list)
    const dispatch = useDispatch();
    const [ quizzes, setQuizzes ] = useState(null)
    const [ quizname, setQuizname ] = useState('')
    const [ showQuizForm, setShowQuizForm  ] = useState(false)
    const [ index, setIndex ] = useState(0);
    const [ page, setPage ] = useState(0);
    const [ question, setQuestion ] = useState('');
    const [ options, setOptions ] = useState({option1 : '', option2: '', option3: '', option4: '', option5: '', option6: ''});
    const [ answer, setAnswer ] = useState('');
    const [ reason, setReason ] = useState('');
    const [ courses, setCourses ] = useState(null)
    const [ course, setCourse ] = useState('');

    useEffect(()=>
    {
        getQuizzes();
        getCourses();
    },[])

    const getCourses = async () =>
    {
        const url = '/api/course'
        const response = await axios.get(url) 
        setCourses(response.data.courses);
    }

     const getQuizzes = async () =>
    {
        const url = '/api/quiz';
        const response = await axios.get(url);
        setQuizzes(response.data);
    }

    const handleOptions = (e) =>
    {
        const {name, value} = e.target;
        setOptions({...options, [name]: value});
    }

    const handleUpdate = () =>
    {
        if(!question)   
            return
        if(!answer)
            return
        if(!reason)
            return

        let optionsList = [];
        for(let [key, value] of Object.entries(options))
        {
            if(value)
                optionsList.push(value);
        }
        if(optionsList.length<2)
            return
        dispatch(updateQuestion({index, question, options: optionsList, answer, reason}))
    }

    const addNewQuestion = () =>
    {
        if(!quizData[page].hasOwnProperty('question'))
            return
        dispatch(addQuestion({index: page+1}))
        setPage(quizData.length);
        setIndex(quizData.length);
        setQuestion('');
        setOptions({option1 : '', option2: '', option3: '', option4: '', option5: '', option6: ''});
        setAnswer('');
        setReason('');
    }

    const handlePrev = () =>
    {
        setIndex((prev) => prev -1);
        handleEdit(quizData[index-1])
    }

    const handleNext = () =>
    {
        setIndex((prev) => prev+1);
        handleEdit(quizData[index+1])
    }

    const handleEdit = (data) =>
    {
        setIndex(data.id);
        setQuestion(data.hasOwnProperty('question') ? data.question : '');
        setOptions(data.hasOwnProperty('options') ? {option1: data.options[0], option2: data.options[1], option3: data.options[2], option4: data.options[3], option5: data.options[4], option6: data.options[5]} : {option1: '', option2: '', option3: '', option4: '', option5: '', option6: ''})
        setAnswer(data.hasOwnProperty('answer') ? data.answer : '');
        setReason(data.hasOwnProperty('reason') ? data.reason : '' );
    }
    
    const handlePost = async () =>
    {
        if(!quizname)
            return
        if(!course)
            return
        try
        {
            const url = '/api/quiz'
            await axios.post(url, {title: quizname, course, list: quizData})
            getQuizzes();
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return(
        <div className={styles.wrapper}>
            {quizzes ? <div className={styles.container}>
                <div className={styles.listHeader}>
                    <button className={styles.add} onClick={()=> setShowQuizForm(!showQuizForm)}>{showQuizForm ? 'close' : '+ Create quiz'}</button>
                </div>
                {showQuizForm && 
                <div className={styles.quizWrapper}>
                    <div className={styles.quizform}> 
                        <div className={styles.header}>
                            <TextField color='grey' size='small'  className={styles.headerInput} placeholder='Enter quiz name' name="quizname" value={quizname} onChange={(e)=> setQuizname(e.target.value)}/>
                            <FormControl className={styles.headerInput} value={course} size='small' color='grey' fullWidth>
                                <InputLabel size='small' color='grey'>Choose course</InputLabel>
                                <Select name="course" label="Choose course" onChange={(e)=> setCourse(e.target.value)}>
                                    {courses?.map((course) =>
                                    (
                                        <MenuItem value={course._id} key={course._id}>{course.title}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl> 
                        </div>
                        <div className={styles.quizNav}>
                            <p className={styles.currentIndex}>{index+1}/{quizData.length}</p>
                            <button className={styles.postquiz} onClick={handlePost}>Post quiz</button>
                        </div>
                        <div className={styles.element} key={quizData[index].id}>
                            <TextField color='grey' size='small' className={styles.input} placeholder='Enter question' name="question" value={question} onChange={(e)=> setQuestion(e.target.value)}/>
                            <TextField color='grey' size='small'  className={styles.input} placeholder='Enter option 1' name="option1" value={options.option1} onChange={handleOptions}/>
                            <TextField color='grey' size='small'  className={styles.input} placeholder='Enter option 2' name="option2" value={options.option2} onChange={handleOptions}/>
                            <TextField color='grey' size='small'  className={styles.input} placeholder='Enter option 3' name="option3" value={options.option3} onChange={handleOptions}/>
                            <TextField color='grey' size='small'  className={styles.input} placeholder='Enter option 4' name="option4" value={options.option4} onChange={handleOptions}/>
                            <TextField color='grey' size='small'  className={styles.input} placeholder='Enter option 5' name="option5" value={options.option5} onChange={handleOptions}/>
                            <TextField color='grey' size='small'  className={styles.input} placeholder='Enter option 6' name="option6" value={options.option6} onChange={handleOptions}/>
                            <TextField color='grey' size='small'  className={styles.input} placeholder='Enter answer' name="answer" value={answer} onChange={(e)=> setAnswer(e.target.value)}/>
                            <TextField color='grey' size='small'  className={styles.input} placeholder='Enter reason' name="reason" value={reason} onChange={(e)=> setReason(e.target.value)}/>
                        </div>
                        <div className={styles.buttons}>
                            <button className={index === 0 ? `${styles.next} ${styles.disabled}` : styles.next} onClick={handlePrev} disabled={index===0}>Prev</button>
                            <button className={styles.next} onClick={handleUpdate}>Update</button>
                            <button className={styles.next} onClick={addNewQuestion}>Add question</button>
                            <button className={index === quizData.length-1 ? `${styles.next} ${styles.disabled}` : styles.next} onClick={handleNext} disabled={index===quizData.length-1}>Next</button>
                        </div>
                    </div>
                    <div className={styles.quizmakercards}>
                        {quizData?.map((data)=>
                        (
                            <QuizmakerCard key={data.id} data={data} handleEdit={handleEdit}/>
                        )).filter((quiz)=> quiz.props.data.hasOwnProperty('question'))}
                    </div>
                </div>}
                <div className={styles.quizzes}>
                    {quizzes?.map((quiz)=>
                    (
                        <QuizCard type="admin" data={quiz} key={quiz._id}/>
                    ))}
                </div>
            </div>:
            <div className={styles.spinner}>
                <CircularProgress sx={{color: '#D4313D'}} />
            </div>}
        </div>
    )
}

export default Assessments