import { calculateResult } from '@/utility/calculateScores'
import styles from './styles.module.css'
import testIcon from '@/assets/test.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import CheckWebcam from '../checkWebcam/CheckWebcam'
import { useEffect, useRef, useState } from 'react'
import { FormatDate } from '@/utility/FormatDate'
import Button from '../button/Button'

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
            <div className={styles.coverImage}>
                <Image className={styles.testIcon} src={testIcon} alt='test'/>
                <p className={styles.title}>Assessment {index+1}</p>
            </div>
            <div className={styles.footer}>
                <span className={styles.date}>{FormatDate(assessment.updatedAt)}</span>
                <Button size='small' label={assessment.status === 'Completed' ? 'Review' : 'Start'} action={()=> router.push(`/dashboard/${batchId}/${assessment._id}`)} />   
            </div>    

            <p className={assessment.status === 'Pending' ? styles.assessmentStatus : 
                (calculateResult(assessment.score, assessment.quiz.length) === 'Qualified' ? `${styles.assessmentStatus} ${styles.success}` : `${styles.assessmentStatus} ${styles.warning}`)}>
                {assessment.status === 'Pending' ? 'Pending' : (calculateResult(assessment.score, assessment.quiz.length))}
            </p>

            {/* {checkCam  && 
            <div className={styles.instructions}>
                <CheckWebcam webcamRef={webcamRef} isCamOn={isCamOn} setIsCamOn={setIsCamOn} checkWebcam={checkWebcam} testId={assessment._id} setCheckCam={setCheckCam}/>
            </div>} */}
        </div>
    )
}

export default AssessmentCard