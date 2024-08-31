import Image from 'next/image'
import styles from './AssessCard.module.css'
import next from '../../assets/next.png'

const AssessCard = ({data}) =>
{

    return(
        <div className={styles.container}>
            <p className={styles.header}>{data.batch.course.title}</p>
            <div className={styles.group}>
                <p className={styles.test}>{data.test.length ? data.test.length +'Tests' : 'No tests assigned yet'} </p>
                <Image className={styles.next} src={next} alt='next'/>
            </div>
            <p className={styles.status}>{data.batch.status}</p>
        </div>
    )
}

export default AssessCard