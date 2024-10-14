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
    const [ multipleAnswers, setMultipleAnswers ] = useState('');
    const [ answers, setAnswers ] = useState({answer1 : '', answer2: '', answer3: '', answer4: ''});
    const [ answer, setAnswer ] = useState('');
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
        setCourses(response.data);
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

    const handleAnswers = (e) =>
    {
        const {name, value} = e.target;
        setAnswers({...answers, [name]: value});
    }

    const handleUpdate = () =>
    {
        if(!question)   
            return

        let optionsList = [];
        for(let [key, value] of Object.entries(options))
        {
            if(value)
                optionsList.push(value);
        }     

        let answersList = [];
        if(multipleAnswers === 'true')
        {            
            for(let [key, value] of Object.entries(answers))
            {
                if(value)
                    answersList.push(Number(value));
            }

            if(answersList.length < 2)
                return
        }
        else
        {
            if(!answer)
                return
        }
      
        const correctAnswer = multipleAnswers === 'true' ?  answersList : [Number(answer)]
        
        dispatch(updateQuestion({index, question, options: optionsList, multipleAnswers, answers: correctAnswer}))
    }

    const addNewQuestion = () =>
    {
        if(!quizData[page].hasOwnProperty('question'))
            return
        dispatch(addQuestion({index: page+1}))
        setPage(quizData.length);
        setIndex(quizData.length);
        setQuestion('');
        setMultipleAnswers('');
        setAnswer('');
        setOptions({option1 : '', option2: '', option3: '', option4: '', option5: '', option6: ''});
        setAnswers({answer1 : '', answer2: '', answer3: '', answer4: ''});
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
        setMultipleAnswers(data.hasOwnProperty('multipleAnswers') ? data.multipleAnswers : '');
        setAnswer(data.hasOwnProperty('answers') ? data.answers : '')
        setAnswers(data.hasOwnProperty('answers') ? {answer1: data.answers[0], answer2: data.answers[1], answer3: data.answers[2], answer4: data.answers[3]} : {answer1: '', answer2: '', answer3: '', answer4: ''});
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
                {showQuizForm && courses &&
                <div className={styles.quizWrapper}>
                    <div className={styles.quizform}> 
                        <div className={styles.header}>
                            <TextField size='small' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.headerInput} placeholder='Enter quiz name' name="quizname" value={quizname} onChange={(e)=> setQuizname(e.target.value)}/>
                            <FormControl className={styles.headerInput} value={course} size='small' fullWidth>
                                <InputLabel size='small' color='grey' sx={{color: 'grey'}} variant='outlined'>Choose course</InputLabel>
                                <Select name="course" color='error'  sx={{color: 'grey'}} placeholder="Choose course" InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} onChange={(e)=> setCourse(e.target.value)}>
                                    {courses.map((course) =>
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
                            <TextField size='small' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter question' name="question" value={question}        onChange={(e)=> setQuestion(e.target.value)}/>
                            <TextField size='small' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter option 1' name="option1"  value={options.option1} onChange={handleOptions}/>
                            <TextField size='small' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter option 2' name="option2"  value={options.option2} onChange={handleOptions}/>
                            <TextField size='small' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter option 3' name="option3"  value={options.option3} onChange={handleOptions}/>
                            <TextField size='small' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter option 4' name="option4"  value={options.option4} onChange={handleOptions}/>
                            <TextField size='small' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter option 5' name="option5"  value={options.option5} onChange={handleOptions}/>
                            <TextField size='small' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter option 6' name="option6"  value={options.option6} onChange={handleOptions}/>
                            <FormControl className={styles.headerInput} value={course} size='small' fullWidth>
                                <InputLabel size='small' color='grey' sx={{color: 'grey'}} variant='outlined'>Multiple answers</InputLabel>
                                <Select name="course" color='error' value={multipleAnswers}  sx={{color: 'grey'}} placeholder="Multiple answers" InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} onChange={(e)=> setMultipleAnswers(e.target.value)}>
                                    <MenuItem value="true">True</MenuItem>
                                    <MenuItem value="false">False</MenuItem>
                                </Select>
                            </FormControl>
                            {multipleAnswers === 'true' &&
                            <div className={styles.element}>
                                <TextField size='small' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter answer 1' name="answer1"  value={answers.answer1} onChange={handleAnswers}/>
                                <TextField size='small' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter answer 2' name="answer2"  value={answers.answer2} onChange={handleAnswers}/>
                                <TextField size='small' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter answer 3' name="answer3"  value={answers.answer3} onChange={handleAnswers}/>
                                <TextField size='small' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter answer 4' name="answer4"  value={answers.answer4} onChange={handleAnswers}/>
                            </div>}
                            {multipleAnswers  === 'false' && <TextField size='small' InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter answer' name="answer"  value={answer} onChange={(e)=> setAnswer(e.target.value)}/>}
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