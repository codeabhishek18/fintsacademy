import Webcam from "react-webcam"
import styles from './styles.module.css'
import { usePathname, useRouter } from "next/navigation"

const CheckWebcam = ({webcamRef, isCamOn, setIsCamOn, setCheckCam, testId}) =>
{
    const router = useRouter()
    const pathname = usePathname();

    return(
        <div className={styles.container}>
            <h2 className={styles.header}>Instructions</h2>
            <ul className={styles.instructions}>
                <li>Read each question carefully before answering.</li>
                <li>Ensure you have a stable internet connection.</li>
                <li>Once you start, you cannot pause the test.</li>
                <li>Make sure your webcam is turned on for monitoring.</li>
            </ul>
            <Webcam width={200} mirrored={true} audio={false} ref={webcamRef} onUserMedia={() => setIsCamOn(true)} onUserMediaError={() => setIsCamOn(false)}/>
            {/* <Image width={120} src={webcam} style={{padding:'30px'}} alt='webcam'/> */}
            {!isCamOn &&  <p className={styles.message}>Enable webcam to proceed</p>}
            <button className={isCamOn ? styles.route : `${styles.route} ${styles.disabled}`} onClick={()=> router.push(`${pathname}/${testId}`)} disabled={!isCamOn}>Start Assessment</button>
            <p className={styles.close} onClick={()=> setCheckCam(false)}>X</p>
        </div>
      )
}

export default CheckWebcam