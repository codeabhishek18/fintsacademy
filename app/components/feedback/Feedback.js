import { Rating, TextField } from '@mui/material';
import styles from './Feedback.module.css'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'sonner';
import CloseDialog from '../closeDialog/CloseDialog';
import Button from '../button/Button';

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
            toast.success(response.data.message);
            setFeedbackForm(false);
        }
        catch(error)
        {
            toast.error(error.message);
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
            <Button label='Submit' action={submitFeedback}/>
            <CloseDialog action={()=> setFeedbackForm(false)}/>
        </div>
    )
}

export default Feedback