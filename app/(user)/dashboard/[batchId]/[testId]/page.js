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
import Webcam from 'react-webcam';
import Loading from '@/app/components/loading/Loading';
import { toast } from 'sonner';
import Button from '@/app/components/button/Button';

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
            toast.error(error.message)
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

    console.log(assessment)

    if(status === 'loading' || isLoading)
        return <Loading/>

    return(
        <div className={styles.wrapper}>
            
            <div className={styles.container}>
                {assessment && 
                <div className={styles.quiz}>
                    <p className={styles.activeQuestion}>{index+1}/{assessment?.quizDetails.quiz?.length}</p>
                    <p className={styles.question}>{assessment.quizDetails.quiz[index].question}</p>
                    
                    {/* {assessment.status === 'Pending' && 
                    <div className={styles.webcam}>
                        <Webcam width={200} mirrored={true}/>
                    </div>} */}
                </div>}
                
                <div className={styles.options}>
                    {assessment.quizDetails.quiz[index].multipleAnswers === 'false' ?

                    (assessment.quizDetails.quiz[index].options.map((option,idx)=>
                    (
                        <button className={assessment.status === 'Pending' ? 
                            ((answersList.list[index]?.includes(idx+1)) ? `${styles.option} ${styles.selected}` : styles.option) : 
                            (assessment.quizDetails.quiz[index].answers.includes(idx+1) ? `${styles.option} ${styles.correct}` : 
                                (assessment.answers[index]?.includes(idx+1)) ? `${styles.option} ${styles.alert}`: `${styles.option} ${styles.read}`)} 
                            key={idx} disabled={assessment.status==='Completed'} 
                            onClick={()=> checkAnswer(index, idx+1)}>{option}
                        </button>
                    ))) :

                    assessment.quizDetails.quiz[index].options.map((option,idx)=>
                    (
                        <button className={assessment.status === 'Pending' ? 
                            ((answersList.list[index]?.includes(idx+1)) ? `${styles.option} ${styles.selected}` : styles.option) : 
                            (assessment.quizDetails.quiz[index].answers.includes(idx+1) ? `${styles.option} ${styles.correct}` : 
                                (assessment.answers[index]?.includes(idx+1)) ? `${styles.option} ${styles.alert}`: `${styles.option} ${styles.read}`)} 
                            key={idx} disabled={assessment.status==='Completed'} 
                            onClick={()=> checkMultipleAnswer(index, idx+1)}>{option}
                        </button>
                    ))}

                    <div className={styles.control}>
                        {index>0 && <button className={styles.button} onClick={()=> setIndex((prev)=> prev-1)}>Previous</button>}
                        
                        {index !== assessment.quizDetails.quiz.length-1 && 
                        <button className={assessment.status === "Completed" ? 
                        styles.button : (!answersList.list[index] ? `${styles.button} ${styles.disabled}` : 
                        styles.button)} disabled={!answersList.list[index] && assessment.status === "Pending"}
                        onClick={()=> setIndex((prev)=> prev+1)}>Next</button>}
                        
                        {index === assessment.quizDetails.quiz.length-1 && assessment.status === "Pending" && 
                        <button className={!answersList.list[index] ? `${styles.button} ${styles.disabled}` : styles.button} disabled={index+1 > assessment.quizDetails.quiz.length} onClick={handleSubmit}>Submit</button>}
                        {index === assessment.quizDetails.quiz.length-1 && assessment.status === "Completed" &&<button className={index+1 > assessment.quizDetails.quiz.length ? `${styles.button} ${styles.disabled}` : styles.button} disabled={index+1 > assessment.quizDetails.quiz.length} onClick={()=> router.push(`${pathname}/scorecard`)}>Scorecard</button>}
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

            
            {isCompleted && 
            <div className={styles.testCompleteWrapper}>
                <div className={styles.testComplete}>
                    <Image className={styles.success} src={success} alt='success'/>
                    <div className={styles.routes}>
                        <Button label='Dashboard' action={()=> router.push(`/dashboard`)}/>
                        <Button label='Scorecard' action={()=> router.push(`${pathname}/scorecard`)}/>
                    </div>
                </div>
            </div> }
        </div>
    )
}

export default Assessment