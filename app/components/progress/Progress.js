'use client'

import styles from './Progress.module.css'
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import axios from 'axios';
import PieChartWithPaddingAngle from '../piechart/PieChart';
import UserCertificate from '../userCertifcate/UserCertificate';
import { toPng } from 'html-to-image';
import download from '@/assets/download.png'
import { Confetti } from '@/utility/confetti';
import { calculateResult } from '@/utility/calculateScores';
import { toast } from 'sonner';
import Button from '../button/Button';
import { FormatDate } from '@/utility/FormatDate';

export const pendingSessions = (sessions) =>
{
    return sessions.filter((session) => session.status === 'Upcoming').length
}

const Progress = ({batchData, level, assessments}) =>
{
    const [ whatsapplink, setWhatsapplink ] = useState('');
    const [ zoomLink, setZoomLink ] = useState('');
    const [ showwlink, setShowWlink ] = useState(false);
    const [ showzlink, setShowZlink ] = useState(false);
    const [ showCertificate, setShowCertificate ] = useState(false);
    const divRef = useRef(null);
    
    const addWhatsappLink = async () =>
    {
        try
        {
            const url = `/api/links/whatsapp/${batchData._id}`
            await axios.post(url, {link : whatsapplink})
            setShowWlink(false)
            setWhatsapplink('');
        }
        catch(error)
        {
            toast.error(error.message);
        }
    }

    const addZoomLink = async () =>
    {
        try
        {   
            const url = `/api/links/zoom/${batchData._id}`
            await axios.post(url, {link : zoomLink})
            setShowZlink(false)
            setZoomLink('');
        }
        catch(error)
        {
            toast.error(error.message);
        }
    }

    const checkProgressStatus = () =>
    {
        if(!assessments.length)
            return toast.error('Certificate will be unlocked only after successful completion of sprint and assessment')

        const isSprintCompleted = pendingSessions(batchData.sessions) === 0 ? 'Completed' : 'Pending'
        const isAssessmentCompleted = assessments.filter((assessment)=> assessment.status === 'Completed');

        if(!isAssessmentCompleted.length)
            return toast.error('Certificate will be unlocked only after successful completion of sprint and assessment')

        if(!isAssessmentCompleted)
            return toast.error('Certification will be unlocked only after successful completion of sprint and assessment')

        const isAssessmentCleared = calculateResult(isAssessmentCompleted[isAssessmentCompleted.length - 1].score, isAssessmentCompleted[isAssessmentCompleted.length - 1].quiz.length)

        if(isSprintCompleted === 'Pending' || isAssessmentCleared !== 'Qualified')
            return toast.error('Certification will be unlocked only after successful completion of sprint and assessment')

        setShowCertificate(true)
        Confetti();
    }

    const downloadCertification = 
    useCallback(() => 
    {   
        if(divRef.current === null) 
            return

        Confetti();

        toPng(divRef.current, { cacheBust: true, })
        .then((dataUrl) => 
        {
            const link = document.createElement('a')
            link.download = 'fintsacademy.png'
            link.href = dataUrl
            link.click()
        })
        .catch((err) => 
        {
            toast.error(err)
        })

      }, [divRef])

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.courseTitle}>{batchData.course.title}</h1>
                <span className={styles.dates}>{FormatDate(batchData.startDate)} - {FormatDate(batchData.endDate)}</span>
            </div>
            <PieChartWithPaddingAngle sessionData={batchData}/>
            <div className={styles.batchDetails}>
                <div className={styles.group}>
                    <span>Sprint code</span>
                    <span>{batchData.title}</span>
                </div>
                <div className={styles.group}>
                    <span>Sprint mentor</span>
                    <span>{batchData.mentor.name}</span>
                </div>
                <div className={styles.group}>
                    <span>Completion</span>
                    <span>{Math.ceil((batchData.sessions?.length - pendingSessions(batchData.sessions))*100/batchData.sessions.length)}%</span>
                </div>
                <div className={styles.group}>
                    <span>Whatsapp group</span>
                    {level === "user" ? <button className={styles.connect}>Connect</button> :
                    <button className={styles.connect} onClick={()=> setShowWlink(true)}>Add link</button>}
                </div>
               {showwlink && <div className={styles.addlink}>
                    <input className={styles.link} placeholder='add whatsapp link' value={whatsapplink} onChange={(e)=> setWhatsapplink(e.target.value)}/>
                    <button className={styles.button} onClick={addWhatsappLink}>Add</button>
                </div>}
                <div className={styles.group}>
                    <span>Zoom link</span>
                    {level === "user" ? <button className={styles.connect}>Connect</button> :
                    <button className={styles.connect} onClick={()=> setShowZlink(true)}>Add link</button>}  
                </div>
                {showzlink && <div className={styles.addlink}>
                    <input className={styles.link} placeholder='add zoom link' value={zoomLink} onChange={(e)=> setZoomLink(e.target.value)}/>
                    <button className={styles.button} onClick={addZoomLink}>Add</button>
                </div>}
            </div>

            {level !== 'admin' && <Button label='Unclock certificate' action={checkProgressStatus} fullwidth={true}/>}

            {showCertificate && 
            <div className={styles.certificateWrapper}>
                <UserCertificate course={batchData.course} date={batchData.endDate} divRef={divRef} />
                <div className={styles.download} onClick={downloadCertification}><Image className={styles.downloadIcon} src={download} alt='certificate'/>Download certificate</div>
                <button className={styles.close} onClick={()=> setShowCertificate(false)}>X</button>
            </div>}
        </div>
    )
}

export default Progress