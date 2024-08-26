import styles from './styles.module.css'

const Lecturecard = ({lecture, index}) =>
{

    const contentList = lecture.description.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)(?=\s|$)/)
                        .filter(sentence => sentence.trim().length > 0);

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.title}>Lecture {index+1}</p>
                <p className={styles.duration}>{lecture.duration} hours</p>
            </div>
            <ul className={styles.lecture}>
            {contentList.map((data,index)=>
            (
                <li className={styles.list} key={index}>{data}</li>
            ))}
            </ul>
        </div>
    )
}

export default Lecturecard