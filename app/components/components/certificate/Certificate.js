import Image from 'next/image'
import styles from './Certificate.module.css'
import certificate from '../../assets/fintscertify.png'

const Certificate = () =>
{

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.certificate}>
                    <Image className={styles.Image} src={certificate} alt='certificate'/> 
                </div>
                <p className={styles.user}>Abhishek Magadum</p>
                <p className={styles.course}>Transaction Monitoring</p>
            </div>
        </div>
    )
}

export default Certificate