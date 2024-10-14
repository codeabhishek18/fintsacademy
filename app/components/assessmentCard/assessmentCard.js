'use client'

import { calculateResult } from '@/utility/calculateScores'
import styles from './styles.module.css'
import test from '@/assets/test.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import CheckWebcam from '../checkWebcam/CheckWebcam'
import { useEffect, useRef, useState } from 'react'
import { FormatDate } from '@/utility/FormatDate'

const AssessmentCard = ({assessment, index, batchId}) =>
{
    const router = useRouter();
    // const webcamRef = useRef(null);
    // const [ isCamOn, setIsCamOn ] = useState(false);
    // const [ checkCam, setCheckCam ] = useState(false)

    // const checkWebcam = () => 
    // {
    //     if (webcamRef.current?.stream) 
    //         setIsCamOn(true);
    //     else 
    //         setIsCamOn(false);
    // }

    // useEffect(()=>
    // {
    //     checkWebcam();
    // }, [webcamRef])

    return(
        <div className={styles.container} >
            <div className={styles.testImage}>
                <Image className={styles.test} src={test} alt='test'/>
                <p className={styles.title}>Assessment {index+1}</p>
            </div>
            <div className={styles.testDetails}>
               
                
                <div className={styles.footer}>
                    <p className={styles.date}>{FormatDate(assessment.updatedAt)}</p>
                    {assessment.status === 'Completed' ? 
                    <button className={styles.route} onClick={()=> router.push(`/dashboard/${batchId}/${assessment._id}`)}>Review</button> :
                    <button className={styles.route} onClick={()=> router.push(`/dashboard/${batchId}/${assessment._id}`)}>Start</button> 
                    // <button className={styles.route} onClick={()=> setCheckCam(true)}>Start</button>
                    }
                </div>                    
            </div>
            

            {/* {checkCam  && 
            <div className={styles.instructions}>
                <CheckWebcam webcamRef={webcamRef} isCamOn={isCamOn} setIsCamOn={setIsCamOn} checkWebcam={checkWebcam} testId={assessment._id} setCheckCam={setCheckCam}/>
            </div>} */}
        </div>
    )
}

export default AssessmentCard