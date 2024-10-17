'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addQuestion, editQuiz, updateQuestion } from '@/store/slices/quizmakerReducer'
import QuizmakerCard from '@/app/components/quizmakerCard/QuizmakerCard'
import {  FormControl, MenuItem, Select, TextField } from '@mui/material'
import Label from '@/app/components/label/Label'
import Button from '@/app/components/button/Button'
import { toast } from 'sonner'
import CloseDialog from '@/app/components/closeDialog/CloseDialog'
import { FormatDate } from '@/utility/FormatDate'

const QuizMaker = ({type, quiz, quizInfo}) =>
{
    const quizData = useSelector((state) => state.quizmaker.list)
    const dispatch = useDispatch();
    const [ quizname, setQuizname ] = useState('')
    const [ showDialog, setShowDialog  ] = useState(false)
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
        getCourses();
    },[])

    useEffect(()=> 
    {
        if(type==="edit")
        {
            dispatch(editQuiz(quiz));
            setPage(1);
            handleEdit(quiz[0])
        }
    },[quiz])

    const getCourses = async () =>
    {
        const url = '/api/course'
        const response = await axios.get(url) 
        setCourses(response.data);
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
            return toast('No question found')

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
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return(
        <div className={styles.container}>
            {type == "edit" && quizInfo &&
            <div className={styles.quizInfo}>
                <p className={styles.title}>{quizInfo.title}</p>
                <p className={styles.date}>Created on / {FormatDate(quizInfo.createdAt)}</p>
            </div>}

            <div className={styles.quizform}> 
                <div className={styles.group}>
                    <Label label="Question"/>
                    <TextField InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} name="question" value={question} onChange={(e)=> setQuestion(e.target.value)}/>        
                                            
                    <Label label="Options"/>
                    <div className={styles.options} key={quizData[index].id}>       
                        <TextField InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter option 1' name="option1"  value={options.option1} onChange={handleOptions}/>
                        <TextField InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter option 2' name="option2"  value={options.option2} onChange={handleOptions}/>
                        <TextField InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter option 3' name="option3"  value={options.option3} onChange={handleOptions}/>
                        <TextField InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter option 4' name="option4"  value={options.option4} onChange={handleOptions}/>
                        <TextField InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter option 5' name="option5"  value={options.option5} onChange={handleOptions}/>
                        <TextField InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter option 6' name="option6"  value={options.option6} onChange={handleOptions}/>
                    </div>
                </div>

                <div className={styles.group}>
                    <Label label='Multiple Answers'/>
                    <FormControl className={styles.headerInput} value={course} fullWidth>
                        <Select name="course" color='error' value={multipleAnswers}  sx={{color: 'grey'}} placeholder="Multiple answers" InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} onChange={(e)=> setMultipleAnswers(e.target.value)}>
                            <MenuItem value="true">Yes</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                        </Select>
                    </FormControl>
                    {multipleAnswers && <Label label={multipleAnswers === 'true' ? 'Answers' : 'Answer'}/>}
                    {multipleAnswers === 'true' &&
                    <div className={styles.options}>
                        <TextField InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter answer 1' name="answer1"  value={answers.answer1} onChange={handleAnswers}/>
                        <TextField InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter answer 2' name="answer2"  value={answers.answer2} onChange={handleAnswers}/>
                        <TextField InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter answer 3' name="answer3"  value={answers.answer3} onChange={handleAnswers}/>
                        <TextField InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter answer 4' name="answer4"  value={answers.answer4} onChange={handleAnswers}/>
                    </div>}
                    {multipleAnswers  === 'false' && <TextField InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.input} placeholder='Enter answer' name="answer"  value={answer} onChange={(e)=> setAnswer(e.target.value)}/>}
                    <div className={styles.buttons}>
                        <div className={styles.formControl}>
                            <Button fullwidth={false} action={handleUpdate} label='Update'/>
                            <Button fullwidth={false} action={addNewQuestion} label='New question'/>
                        </div>
                        <Button fullwidth={false} action={()=> setShowDialog(true)} label='Finish'/>
                    </div>
                </div>
            </div>

            <div className={styles.quizmakercards}>
                {quizData?.map((data)=>
                (
                    <QuizmakerCard key={data.id} data={data} active={index} handleEdit={handleEdit}/>
                ))}
            </div>

            {showDialog && 
            <div className={styles.dialogWrapper}>
                <div className={styles.dialog}>
                    <Label label="Assessment Name"/>
                    <TextField InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} className={styles.headerInput} name="quizname" value={quizname} onChange={(e)=> setQuizname(e.target.value)}/>
                
                    <Label label="Choose course"/>
                    <FormControl className={styles.headerInput} value={course} fullWidth>
                        <Select name="course" color='error'  sx={{color: 'grey'}} InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} onChange={(e)=> setCourse(e.target.value)}>
                        {courses?.map((course) =>
                        (
                            <MenuItem value={course._id} key={course._id}>{course.title}</MenuItem>
                        ))}
                        </Select>
                    </FormControl> 
                    <Button fullwidth={true} action={()=> handlePost} label='Post Assessment'/>
                    <p style={{color: 'grey', textAlign:'center', marginTop: '10px'}}>{quizData?.hasOwnProperty('question') ? quizData.length : 0} assessment questions</p>
                    <CloseDialog action={()=> setShowDialog(false)}/>
                </div>
            </div>}
        </div>
                
    )
}

export default QuizMaker