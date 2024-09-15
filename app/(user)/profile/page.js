'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSession } from 'next-auth/react';
import axios from 'axios';

const Profile = () =>
{
    const [ user, setUser ] = useState(null); 
    const { data, status } = useSession();

    useEffect(()=>
    {
        status === 'authenticated' && getUser();
    },[status])

    const getUser = async () =>
    {
        try
        {
            const url = `/api/user/${data.user.id}`
            const response = await axios.get(url);
            setUser(response.data);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(
        <div className={styles.wrapper}>
            {user && 
            <div className={styles.container}>
                <p className={styles.name}>{user.name}</p>
                <p className={styles.name}>{user.email}</p>
                <p className={styles.name}>{user.name}</p>
                <p className={styles.name}>{user.name}</p>
            </div>}
        </div>
    )
}

export default Profile