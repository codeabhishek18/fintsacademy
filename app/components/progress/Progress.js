'use client'

import styles from './Progress.module.css'
import certificate from '@/assets/certification.png'
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import PieChartWithPaddingAngle from '../piechart/PieChart';
import UserCertificate from '../userCertifcate/UserCertificate';

const options = { year: 'numeric', month: 'long', day: 'numeric' };
export const pendingSessions = (sessions) =>
{
    return sessions.filter((session) => session.status === 'Upcoming').length
}

const Progress = ({data, level}) =>
{
    const [ whatsapplink, setWhatsapplink ] = useState('');
    const [ zoomLink, setZoomLink ] = useState('');
    const [ showwlink, setShowWlink ] = useState(false);
    const [ showzlink, setShowZlink ] = useState(false);
    const [ showCertificate, setShowCertificate ] = useState(false);
    const router = useRouter();
    
    const addWhatsappLink = async () =>
    {
        const url = `/api/links/whatsapp/${data._id}`
        await axios.post(url, {link : whatsapplink})
        setShowWlink(false)
        setWhatsapplink('');
    }

    const addZoomLink = async () =>
    {
        const url = `/api/links/zoom/${data._id}`
        await axios.post(url, {link : zoomLink})
        setShowZlink(false)
        setZoomLink('');
    }

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.courseTitle}>{data.course.title}</h1>
                <p className={styles.dates}>{new Date(data.startDate).toLocaleDateString('en-US', options)} - {new Date(data.endDate).toLocaleDateString('en-US', options)} </p>
            </div>
            <div className={styles.progress}>
                <p className={styles.progressTitle}>Progress</p>
                <PieChartWithPaddingAngle sessionData={data}/>
            </div>
            <div className={styles.batch}>
                <div className={styles.group}>
                    <p className={styles.batchCode}>Sprint code</p>
                    <span>{data.title}</span>
                </div>
                <div className={styles.group}>
                    <p className={styles.mentor}>Sprint mentor</p>
                    <span>{data.mentor.name}</span>
                </div>
                <div className={styles.group}>
                    <p className={styles.batchCode}>Completion</p>
                    <span>{Math.ceil((data.sessions?.length - pendingSessions(data.sessions))*100/data.sessions.length)}%</span>
                </div>
                <div className={styles.group}>
                    <p className={styles.groupTitle}>Whatsapp group</p>
                    {level === "user" ? <button className={styles.connect}>Connect</button> :
                    <button className={styles.connect} onClick={()=> setShowWlink(true)}>Add link</button>}
                </div>
               {showwlink && <div className={styles.addlink}>
                    <input className={styles.link} placeholder='add whatsapp link' value={whatsapplink} onChange={(e)=> setWhatsapplink(e.target.value)}/>
                    <button className={styles.button} onClick={addWhatsappLink}>Add</button>
                </div>}
                <div className={styles.group}>
                    <p className={styles.groupTitle}>Zoom link</p>
                    {level === "user" ? <button className={styles.connect} onClick={()=> router.push(data.zoomLink)}>Connect</button> :
                    <button className={styles.connect} onClick={()=> setShowZlink(true)}>Add link</button>}  
                </div>
                {showzlink && <div className={styles.addlink}>
                    <input className={styles.link} placeholder='add zoom link' value={zoomLink} onChange={(e)=> setZoomLink(e.target.value)}/>
                    <button className={styles.button} onClick={addZoomLink}>Add</button>
                </div>}
            </div>
            {level === 'user' && <div className={styles.footer}>
                <div className={styles.certificationDetails} onClick={()=> setShowCertificate(true)}>
                    <p className={styles.pendingSessions}>{pendingSessions(data.sessions) === 0 ? 'Unlock certification now' : pendingSessions(data.sessions) +' more session(s) to unlock certification'}</p>
                    <div className={styles.certificate}><Image src={certificate} alt='certificate'/>Download Certificate</div>
                </div>
            </div>}
            {showCertificate &&
            <div className={styles.userCertificate}>
                <UserCertificate course={data.course.title} date={data.startDate}/>
            </div> }
        </div>
    )
}

export default Progress