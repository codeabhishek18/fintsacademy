'use client'

import styles from './styles.module.css'  
import axios from "axios";
import { useSession } from "next-auth/react"
import Image from 'next/image';
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import success from '@/assets/success.png'
import { useDispatch, useSelector } from "react-redux";
import { addAnswers, updateAnswer } from "@/store/slices/quizReducer";
import { CircularProgress } from '@mui/material';

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
    
    const checkAnswer = (option, answer, index, selected) =>
    {
        if(answersList.length === index)
        {
            if(option === answer)
                dispatch(addAnswers({selected, answer}))
            else
                dispatch(addAnswers({selected, answer: option}))
        }
        else
        {
            if(option === answer)
                dispatch(updateAnswer({index, selected, answer}))
            else
                dispatch(updateAnswer({index, selected, answer: option}));
        }
    }

    const handleSubmit =  async() =>
    {
        const answers = [];
        answersList.list.forEach((quiz)=>
        {
            answers.push(quiz.answer)
        })   

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
                {assessment && <p>{index+1}/{assessment.quiz.length}</p>}
                {assessment && 
                <div className={styles.quiz}>
                    <p className={styles.question}>{assessment.quiz[index].question}</p>
                    {assessment.status==='Completed' && 
                    <p className={styles.reason}>REASON : {assessment.quiz[index].reason}</p>}
                    <div className={styles.options}>
                    {assessment.quiz[index].options.map((option,idx)=>
                    (
                        <button className={assessment.status === 'Pending' ? 
                            (idx+1 === answersList.list[index]?.selected ? `${styles.option} ${styles.selected}` : styles.option) : 
                            (option === assessment.quiz[index].answer ? `${styles.option} ${styles.correct}` : 
                                option === assessment.answers[index] ? `${styles.option} ${styles.alert}`: `${styles.option} ${styles.read}`)} 
                            key={idx} disabled={assessment.status==='Completed'} 
                            onClick={()=> checkAnswer(option, assessment.quiz[index].answer, index, idx+1)}>{option}
                        </button>
                    ))}
                    </div>
                    <div className={styles.control}>
                        {index>0 && <button className={styles.button} onClick={()=> setIndex((prev)=> prev-1)}>Previous</button>}
                        {index !== assessment.quiz.length-1 && <button className={assessment.status === "Completed" ? styles.button : (index+1 > answersList.list.length ? `${styles.button} ${styles.disabled}` : styles.button)} disabled={assessment.status === "Pending" && index+1 > answersList.list.length} onClick={()=> setIndex((prev)=> prev+1)}>Next</button>}
                        {index === assessment.quiz.length-1 && assessment.status === "Pending" && <button className={index+1 > answersList.list.length ? `${styles.button} ${styles.disabled}` : styles.button} disabled={index+1 > assessment.quiz.length} onClick={handleSubmit}>Submit</button>}
                        {index === assessment.quiz.length-1 && assessment.status === "Completed" &&<button className={index+1 > assessment.quiz.length ? `${styles.button} ${styles.disabled}` : styles.button} disabled={index+1 > assessment.quiz.length} onClick={()=> router.push(`${pathname}/scorecard`)}>Scorecard</button>}
                    </div> 
                </div>}
            </div>

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