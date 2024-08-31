'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './styles.module.css'
import MentorForm from '@/app/components/mentorForm/MentorForm'
import MentorCard from '@/app/components/mentorCard/MentorCard'

const Mentors = () =>
{
    const [ mentors, setMentors ] = useState([]);
    const [ mentorForm, setMentorForm ] = useState(false)

    const getMentors = async () =>
    {
        const url = `/api/mentor`
        const response = await axios.get(url);
        setMentors(response.data.mentors);
    }

    useEffect(()=>
    {
        getMentors();
    },[])

    // const removeMentor = async (id) =>
    // {
    //     try
    //     {
    //         const url = `/api/mentor/${id}`
    //         await axios.delete(url, mentorData)
    //         setBatches(response.data)
    //     }
    //     catch(error)
    //     {
    //         console.log(error)
    //     }
    // }

    return(
            <div className={styles.container}>

                <div className={styles.header}>
                    <button className={styles.add} onClick={()=> setMentorForm(!mentorForm)}>{mentorForm ? 'close' : '+ Add Mentor'}</button>
                </div>

                {mentorForm && 
                <MentorForm/>}

                <div className={styles.list}>
                    {mentors?.map((mentor) =>
                    (
                        <MentorCard data={mentor} key={mentor._id}/>
                    ))}
                </div>

            </div>
    )
}

export default Mentors