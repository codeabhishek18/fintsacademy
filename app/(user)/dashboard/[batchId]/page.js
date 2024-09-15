'use client'

import styles from './styles.module.css'  
import Progress from "@/app/components/progress/Progress";
import SessionCard from "@/app/components/sessionCard/SessionCard";
import axios from "axios";
import { useSession } from "next-auth/react"
import Image from 'next/image';
import { useParams, usePathname, useRouter } from "next/navigation";
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
    const [ feedbackForm, setFeedbackForm ] = useState(false);
    const [ feedbackTooltip, setFeedbackTooltip ] = useState(false);
    const [ hideFeedback, setHideFeedback ] = useState(true);
    const pathname = usePathname();
    const batchTitle = pathname.split('/')[2]
    const router = useRouter();
    
    const getBatchData = async () =>
    {
        try
        {
            const url = `/api/batch/${batchId}`
            const response = await axios.get(url);
            setBatchData(response.data)
            checkfeedback(response.data)
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const checkfeedback = (batch) =>
    { 
        const response = batch.course.feedbacks.find((feed) => feed.user === data.user.id);
        if(response)
            setHideFeedback(false);
    }
    
    const getAsssessments = async () =>
    {
        try
        {
            const url = `/api/user/${data.user.id}`
            const response = await axios.get(url);
            const batchAssessments = response.data.enrollments.find((enrollment) => enrollment.batch.title === batchTitle);
            setAssessments(batchAssessments);
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
        <div onClick={()=> setActiveAgenda(-1)} className={styles.wrapper}>
        
            {batchData &&
            <div className={styles.container} >
                <div className={styles.progress}>
                    <Progress batchData={batchData} level='user' assessments={assessments}/>
                </div>

                <div className={styles.practicals}>
                    <div className={styles.sessions}>
                        {batchData.sessions.map((data, index)=>
                        (
                            <SessionCard session={data} index={index} setActiveAgenda={setActiveAgenda} activeAgenda={activeAgenda} level='user' key={data._id}/>
                        ))}
                    </div>

                    
                </div>
            </div>}

            <div className={styles.assessmentWrapper}>
                {assessments.assessments.length  >0 && <p className={styles.header}>Assessments</p>}
                <div className={styles.assessments}>
                    {assessments?.assessments?.map((assessment, index)=>
                    (
                        <AssessmentCard assessment={assessment} index={index} key={data._id} batchId={batchId}/>
                    )
                )}
            </div>
            </div>

            {hideFeedback && <Image className={styles.feedback} src={feedback} alt='feedback' onClick={()=> setFeedbackForm(true)} onMouseEnter={()=> setFeedbackTooltip(true)} onMouseLeave={()=> setFeedbackTooltip(false)}/>}
            {feedbackTooltip && <p className={styles.toolTip}>Feedback</p>}
            {feedbackForm && 
            <div className={styles.feedbackForm}>
                <Feedback setFeedbackForm={setFeedbackForm} courseId={batchData.course._id}/>
            </div>}
        </div>
    )
}

export default Dashboard