import { Rating, TextField } from '@mui/material';
import styles from './Feedback.module.css'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const Feedback = ({setFeedbackForm, courseId}) =>
{
    const [ value, setValue ] = useState(null);
    const [ feedback, setFeedbcak ] = useState('');
    const { data, status } = useSession();

    const submitFeedback = async (e) =>
    {
        e.preventDefault();

        if(status === 'unauthenticated')
            return 

        try
        {
            const url = '/api/feedback'
            const response = await axios.post(url, {user: data.user.id, course: courseId, rating: value, comment: feedback }) 
            setFeedbackForm(false);
        }
        catch(error)
        {
            console.log(error)
        }
    }


    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Feedback</h1>
            <p className={styles.description}>
                As we approach the end of our current sprint, 
                we value your feedback to help us improve our offerings 
                and provide the best possible experience for you.
            </p>
            <Rating name="size-large" className={styles.rating} sx={{'& .MuiRating-iconEmpty': { color: 'gold'}}} value={value} onChange={(event, newValue) => {setValue(newValue)}} size="large"  />
            <TextField className={styles.feedback}  value={feedback} onChange={(e)=> setFeedbcak(e.target.value)}
            InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#D4313D'}}}} placeholder='Feedback' color='grey' fullWidth/>
            <button className={styles.submit} onClick={submitFeedback}>Submit</button>
            <p className={styles.close} onClick={()=> setFeedbackForm(false)}>X</p>
        </div>
    )
}

export default Feedback