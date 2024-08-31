import { Rating } from '@mui/material';
import styles from './Feedback.module.css'
import { useState } from 'react';

const Feedback = () =>
{
    const [ value, setValue ] = useState(null)

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Feedback</h1>
            <p className={styles.description}>
                As we approach the end of our current sprint, 
                we value your feedback to help us improve our offerings 
                and provide the best possible experience for you.
            </p>
            <Rating name="simple-controlled" value={value} onChange={(event, newValue) => {setValue(newValue)}} size="large"/>
            <textarea className={styles.feedback} placeholder='Feedback'></textarea>
            <button className={styles.submit}>Submit</button>
        </div>
    )
}

export default Feedback