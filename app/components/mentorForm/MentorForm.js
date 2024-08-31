import { TextField } from '@mui/material'
import styles from './styles.module.css'
import axios from 'axios';

const MentorForm = () =>
{    

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name')
        const email = formData.get('email')
        const phone = formData.get('phone')
        const about = formData.get('about')
        const experience = formData.get('experience')
        const linkedin = formData.get('linkedin')
    
        try
        {
            const url = '/api/mentor'
            const response = await axios.post(url, {name, email, phone, about, experience, linkedin})
            console.log(response);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(
        <div className={styles.container}>
            <p className={styles.header}>Add Mentor</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <TextField className={styles.inputs} color='grey' size='small' label="Name" type="text" name="name" fullWidth/>
                <TextField className={styles.inputs} color='grey' size='small' label="Email" type="text" name="email" fullWidth/>
                <TextField className={styles.inputs} color='grey' size='small' label="Phone" type="text" name="phone" fullWidth/>
                <TextField className={styles.inputs} color='grey' size='small' label="About" type="text" name="about" fullWidth/>
                <TextField className={styles.inputs} color='grey' size='small' label="Experience" type="text" name="experience" fullWidth/>
                <TextField className={styles.inputs} color='grey' size='small' label="Linked in" type="text" name="linkedin" fullWidth/>
                <button className={styles.createButton} type='submit'>Create</button>
            </form>
        </div>
    )
}

export default MentorForm