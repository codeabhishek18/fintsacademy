'use client'

import { useSearchParams } from 'next/navigation';
import styles from './styles.module.css'
import QuizMaker from '@/app/components/quizMaker/QuizMaker'
import { toast } from 'sonner';
import axios from 'axios';
import { Suspense, useEffect, useState } from 'react';
import Loading from '@/app/components/loading/Loading';

export default function Page() {
    return (
      <Suspense fallback={null}>
        <EditQuiz/>
      </Suspense>
    );
  }

const EditQuiz = () =>
{
    const [ quizData, setQuizData ] = useState(null);
    const [ isLoading,setIsLoading ] = useState(false);
    const searchParams = useSearchParams();
    const quizId = searchParams.get('id');

    useEffect(()=>
    {
        getQuiz();
    },[])

    const getQuiz = async () =>
    {
        try
        {
            setIsLoading(true);
            const url = `/api/quiz/${quizId}`
            const response = await axios.get(url);
            setQuizData(response.data);
            setIsLoading(false);
        }
        catch(error)
        {
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    if(isLoading || !quizData)
        return <Loading/>

    return(
        <QuizMaker type="edit" quiz={quizData.quiz} quizInfo={quizData}/>  
    )  
}
