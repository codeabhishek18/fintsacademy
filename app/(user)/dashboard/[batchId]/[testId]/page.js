'use client'

import styles from './styles.module.css'  
import axios from "axios";
import { useSession } from "next-auth/react"
import Image from 'next/image';
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import success from '@/assets/success.png'
import { useDispatch, useSelector } from "react-redux";
import { addAnswer, addMultipleAnswer, updateAnswer } from "@/store/slices/quizReducer";
import { CircularProgress } from '@mui/material';
import Webcam from 'react-webcam';

const Assessment = () =>
{
    const { testId } = useParams();
    const { data, status } = useSession();
    const [ isLoading, setIsLoading ] = useState(true)
    const [ assessment, setAssessment ] = useState(null)
    const [ isCompleted, setIsCompleted ] = useState(false)
    const [ index, setIndex ] = useState(0);
    const router = useRouter();
    const pathname = usePathname();
    const answersList = useSelector((state) => state.quizList);
    const dispatch = useDispatch();

    const getAsssessment = async () =>
    {
        try
        {
            const url = `/api/assessment/${testId}`
            const response = await axios.get(url);
            setAssessment(response.data);   
            setIsLoading(false);
        }
        catch(error)
        {
            console.log(error)
        }
    }
    
    useEffect(() => 
    {
        if(status === "authenticated")
            getAsssessment()
        else if(status === "unauthenticated")
            router.push('/')
        else
            setIsLoading(true);
    }, [status]);
    
    const checkAnswer = (index, answer) =>
    {
        dispatch(addAnswer({index, answer}))
    }

    const checkMultipleAnswer = (index, answer) =>
    {
        dispatch(addMultipleAnswer({index, answer}))
    }

    const handleSubmit =  async() =>
    {
        const answers = answersList.list

        const url = `/api/assessment/${testId}`
        await axios.post(url, {answers});
        setIsCompleted(true)
    }

    if(status === 'loading' || isLoading)
        return(
            <div className={styles.spinner}>
                <CircularProgress sx={{color: '#D4313D'}} />
            </div>    
        )

    return(
        <div className={styles.wrapper}>
            
            <div className={styles.container}>
                {assessment && 
                <div className={styles.quiz}>
                    <p className={styles.activeQuestion}>{index+1}/{assessment?.quiz?.length}</p>
                    <p className={styles.question}>{assessment.quiz[index].question}</p>
                    
                    {assessment.status === 'Pending' && 
                    <div className={styles.webcam}>
                        <Webcam width={200} mirrored={true}/>
                    </div>}
                </div>}
                
                <div className={styles.options}>
                    {assessment.quiz[index].multipleAnswers === 'false' ?

                    (assessment.quiz[index].options.map((option,idx)=>
                    (
                        <button className={assessment.status === 'Pending' ? 
                            ((answersList.list[index]?.includes(idx+1)) ? `${styles.option} ${styles.selected}` : styles.option) : 
                            (assessment.quiz[index].answers.includes(idx+1) ? `${styles.option} ${styles.correct}` : 
                                (assessment.answers[index]?.includes(idx+1)) ? `${styles.option} ${styles.alert}`: `${styles.option} ${styles.read}`)} 
                            key={idx} disabled={assessment.status==='Completed'} 
                            onClick={()=> checkAnswer(index, idx+1)}>{option}
                        </button>
                    ))) :

                    assessment.quiz[index].options.map((option,idx)=>
                    (
                        <button className={assessment.status === 'Pending' ? 
                            ((answersList.list[index]?.includes(idx+1)) ? `${styles.option} ${styles.selected}` : styles.option) : 
                            (assessment.quiz[index].answers.includes(idx+1) ? `${styles.option} ${styles.correct}` : 
                                (assessment.answers[index]?.includes(idx+1)) ? `${styles.option} ${styles.alert}`: `${styles.option} ${styles.read}`)} 
                            key={idx} disabled={assessment.status==='Completed'} 
                            onClick={()=> checkMultipleAnswer(index, idx+1)}>{option}
                        </button>
                    ))}

                    <div className={styles.control}>
                        {index>0 && <button className={styles.button} onClick={()=> setIndex((prev)=> prev-1)}>Previous</button>}
                        
                        {index !== assessment.quiz.length-1 && 
                        <button className={assessment.status === "Completed" ? 
                        styles.button : (!index === answersList.list[index]?.length ? `${styles.button} ${styles.disabled}` : 
                        styles.button)} 
                        onClick={()=> setIndex((prev)=> prev+1)}>Next</button>}
                        
                        {index === assessment.quiz.length-1 && assessment.status === "Pending" && 
                        <button className={index+1 > answersList.list?.length ? `${styles.button} ${styles.disabled}` : styles.button} disabled={index+1 > assessment.quiz.length} onClick={handleSubmit}>Submit</button>}
                        {index === assessment.quiz.length-1 && assessment.status === "Completed" &&<button className={index+1 > assessment.quiz.length ? `${styles.button} ${styles.disabled}` : styles.button} disabled={index+1 > assessment.quiz.length} onClick={()=> router.push(`${pathname}/scorecard`)}>Scorecard</button>}
                    </div> 
                </div>
            </div>

            {assessment.status === 'Completed' &&
            <div className={styles.colorInfo}>
                <div className={styles.group}>
                    <div className={styles.successColor}></div>
                    <p className={styles.info}>Correct Answer</p>
                </div>
                <div className={styles.group}>
                    <div className={styles.alertColor}></div>
                    <p className={styles.info}>Your Answer</p>
                </div>
            </div>}

            {isCompleted && <div className={styles.testCompleteWrapper}>
                <div className={styles.testComplete}>
                <Image className={styles.success} src={success} alt='success'/>
                <div className={styles.routes}>
                    <button className={styles.route} onClick={()=> router.push(`/dashboard`)}>Go to Dashboard</button>
                    <button className={styles.route} onClick={()=> router.push(`${pathname}/scorecard`)}>Scorecard</button>
                </div>
                </div>
            </div> } 
        </div>
    )
}

export default Assessment