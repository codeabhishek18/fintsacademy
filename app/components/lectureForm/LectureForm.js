import { TextField } from '@mui/material'
import styles from './styles.module.css'
import axios from 'axios';

const LectureForm = ({courseId}) =>
{    

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const description = formData.get('description')
        const duration = formData.get('duration')

        try
        {
            const url = `/api/lecture/${courseId}`
            await axios.post(url, {description, duration})   
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(
        <div className={styles.container}>
            <p className={styles.header}>Add Lecture</p>

            <form onSubmit={handleSubmit} className={styles.form}>
                <TextField className={styles.inputs} color='grey' size='small' label="Description" type="text" name="description" fullWidth/>
                <TextField className={styles.inputs} color='grey' size='small' label="Duration" type="text" name="duration" fullWidth/>        
                <button className={styles.createButton} type='submit'>Create</button>
            </form>
            
        </div>
    )
}

export default LectureForm