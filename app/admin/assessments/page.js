'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import QuizCard from '@/app/components/quizCard/QuizCard'
import { toast } from 'sonner'
import Loading from '@/app/components/loading/Loading'
import Button from '@/app/components/button/Button'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const Assessments = () =>
{
    const [ quizzes, setQuizzes ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(()=>
    {
        getQuizzes();
    },[])

    console.log(quizzes);

    const getQuizzes = async () =>
    {
        try
        {
            setIsLoading(true);
            const url = '/api/quiz';
            const response = await axios.get(url);
            setQuizzes(response.data);
            setIsLoading(false);
        }
        catch(error)
        {
            setIsLoading(false);
            toast.error(error.message);
        } 
    }

    return(
        <div className={styles.wrapper}>

            <Button label='+ Create Assessment' action={()=> router.push(`${pathname}/create`)}/>
            {isLoading ?
            <Loading/> : 
            <div className={styles.container}>
            {quizzes?.map((quiz)=>
            (
                <QuizCard type="admin" data={quiz} key={quiz._id}/>
            ))}
            </div>}
        </div>
    )
}

export default Assessments