'use client'

import styles from './styles.module.css'  
import Progress from "@/app/components/progress/Progress";
import SessionCard from "@/app/components/sessionCard/SessionCard";
import axios from "axios";
import { useSession } from "next-auth/react"
import Image from 'next/image';
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import feedback from '@/assets/feedback.png'
import { CircularProgress } from '@mui/material';
import Feedback from '@/app/components/feedback/Feedback';
import AssessmentCard from '@/app/components/assessmentCard/assessmentCard';

const Dashboard = () =>
{
    const { batchId } = useParams();
    const { data, status } = useSession();
    const [ batchData, setBatchData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true)
    const [ activeAgenda, setActiveAgenda ] = useState(-1);
    const [ assessments, setAssessments ] = useState(null);
    const [ feedbackFrom, setFeedbackForm ] = useState(false);
    const [ feedbackTooltip, setFeedbackTooltip ] = useState(false);
    const router = useRouter();

    const getBatchData = async () =>
    {
        try
        {
            const url = `/api/batch/${batchId}`
            const response = await axios.get(url);
            setBatchData(response.data)
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const getAsssessments = async () =>
    {
        try
        {
            const url = `/api/user/${data.user.id}`
            const response = await axios.get(url);
            setAssessments(response.data.enrollments);
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
        {
            getBatchData();
            getAsssessments();
        }
        else if(status === "unauthenticated")
            router.push('/')
        else
            setIsLoading(true);
        
            
    }, [status]);
    

    if(status === 'loading' || isLoading)
        return(
            <div className={styles.spinner}>
                <CircularProgress sx={{color: '#D4313D'}} />
            </div>    
        )

    return(
        <div onClick={()=> setActiveAgenda(-1)}>
            {batchData &&
            <div className={styles.container} >
                <div className={styles.progress}>
                    <Progress data={batchData} level='user'/>
                </div>

                <div className={styles.practicals}>
                    <div className={styles.sessions}>
                        <p className={styles.header}>Lectures</p>
                        {batchData.sessions.map((data, index)=>
                        (
                            <SessionCard session={data} index={index} setActiveAgenda={setActiveAgenda} activeAgenda={activeAgenda} level='user' key={data._id}/>
                        ))}
                    </div>

                    <div className={styles.assessments}>
                        <p className={styles.header}>Assessments</p>  
                        {assessments?.map((enrollment)=>
                        (
                            enrollment?.assessments?.map((assessment, index)=>
                            (
                                <AssessmentCard assessment={assessment} index={index} key={data._id} batchId={batchId}/>
                            ))
                        ))}
                    </div>
                </div>
            </div>}
            <Image className={styles.feedback} src={feedback} alt='feedback' onClick={()=> setFeedbackForm(true)} onMouseEnter={()=> setFeedbackTooltip(true)} onMouseLeave={()=> setFeedbackTooltip(false)}/>
            {feedbackTooltip && <p className={styles.toolTip}>Feedback</p>}
            {feedbackFrom && <div className={styles.feedbackForm}>
                <Feedback setFeedbackForm={setFeedbackForm}/>
            </div>}
        </div>
    )
}

export default Dashboard