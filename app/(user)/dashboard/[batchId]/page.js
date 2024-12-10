'use client'

import styles from './styles.module.css'  
import Progress from "@/app/components/progress/Progress";
import SessionCard from "@/app/components/sessionCard/SessionCard";
import axios from "axios";
import { useSession } from "next-auth/react"
import Image from 'next/image';
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import feedbackIcon from '@/assets/feedback.png'
import next from '@/assets/next.png'
import success_next from '@/assets/success-next.png'
import Feedback from '@/app/components/feedback/Feedback';
import AssessmentCard from '@/app/components/assessmentCard/assessmentCard';
import Loading from '@/app/components/loading/Loading';
import { toast } from 'sonner';
import Button from '@/app/components/button/Button';
import locked from '@/assets/locked.png'
import simulation from '@/assets/simulation.png'
import Link from 'next/link';

const Dashboard = () =>
{
    const { batchId } = useParams();
    const { data, status } = useSession();
    const [ isLoading, setIsLoading ] = useState(true)
    const [ activeAgenda, setActiveAgenda ] = useState(-1);
    const [ enrollmentData, setEnrollmentData ] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const eid = params.get('eid');
    const [ active, setActive ] = useState(null);

    const getEnrollmentDetails = async () =>
    {
        try
        {
            const url = `/api/enrollment/${eid}`
            const response = await axios.get(url);
            setEnrollmentData(response.data)
        }
        catch(error)
        {
            toast.error(error.message);
        }
        finally
        {
            setIsLoading(false);
        }
    }
    
    useEffect(() => 
    {
        if(status === "authenticated" && eid)
            getEnrollmentDetails();
        else if(status === "unauthenticated")
            router.push('/')
        else
            setIsLoading(true);
            
    }, [status]);

    if(status === 'loading' || isLoading)
        return <Loading/>

    return(
        <div onClick={()=> setActiveAgenda(-1)} className={styles.wrapper}>
        
            
            <div className={styles.container} >
                <div className={styles.progress}>
                    <Progress batchData={enrollmentData.batch} level='user' assessments={enrollmentData.assessments}/>
                </div>

                <div className={styles.sessions}>
                    {enrollmentData.batch.sessions.map((session, sessionIndex)=>
                    (
                        <div className={styles.sessionWrapper} key={session._id} onClick={()=> setActive((prev)=> prev === sessionIndex ? null : sessionIndex)}>
                            <SessionCard session={session} index={sessionIndex} setActive={setActive} setActiveAgenda={setActiveAgenda} activeAgenda={activeAgenda} level='user' key={session._id}/>
                     
                            <div className={styles.simulationWrapper}>
                            {enrollmentData.simulation.map((trigger, index)=>
                            {
                                if(Number(trigger.trigger.session) !== sessionIndex+1)
                                    return
                                return(
                                    <div style={{display:'flex', columnGap: '20px', alignItems: 'center'}} key={trigger._id}>
                                        {/* <Image style={{height:'25px', width:'25Spx'}} src={next} alt="icon"/> */}
                                        <div className={styles.simulation}>
                                            <div className='flex items-center gap-3'>
                                                <Image className={styles.lockIcon} src={simulation} alt='icon'/>
                                                <p>Activity {index+1}</p>
                                            </div>
                                            {(session.status === 'Upcoming' ? false : index === 0 ? true : enrollmentData.simulation[index-1].status === 'Completed') ? 
                             
                                            <Image className={styles.unlockIcon} src={trigger.status === 'Completed' ? success_next : next} alt='icon' onClick={()=> router.push(`${pathname}/simulations?activityId=${trigger._id}`)}/> : 
                                            <Image className={styles.lockIcon} src={locked} alt='icon'/>}    
                                        </div>
                                    </div>)
                                
                            })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.assessmentWrapper}>
                {enrollmentData.assessments.length > 0 && 
                <p className={styles.header}>Assessments</p>}
                <div className={styles.assessments}>
                {enrollmentData.assessments.map((assessment, index)=>
                (
                    <AssessmentCard assessment={assessment} index={index} key={data._id} batchId={batchId}/>
                ))}
                </div>
            </div>
        </div>
    )
}

const Loader = () =>
{
    return(
        <Suspense fallback={'loading'}>
            <Dashboard/>
        </Suspense>
    )
}

export default Loader