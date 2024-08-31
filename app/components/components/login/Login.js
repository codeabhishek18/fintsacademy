'use client'

import styles from './Login.module.css'
import registerIcon from '../../assets/register.png'
import axios from 'axios';
import { useState } from 'react'
import { enqueueSnackbar } from 'notistack';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const Login = ({setShowLoginForm}) =>
{
    const [ form, setForm ] = useState({email: '', password: ''})
    const router = useRouter();

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }

    console.log(form)

    const handleForm = async (e) =>
    {
        e.preventDefault();
        try
        {
            const url = '/api/user/login'
            const response = await axios.post(url, {email: form.email, password: form.password}, { withCredentials: true });
            
            localStorage.setItem('user', JSON.stringify({id:response.data.loggedUser._id, name:response.data.loggedUser.firstname}));
            router.push('/user/dashboard')
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.loginImage}>
                <Image className={styles.icon} src={registerIcon} alt='img'/>
            </div>
            <div className={styles.form}>
                <p className={styles.welcome}>Welcome back!</p>
                <input name='email' value={form.email} placeholder='Email' onChange={handleChange}/>
                <input name='password' value={form.password} placeholder='Password' onChange={handleChange}/>
                <button className={styles.submit} onClick={handleForm}>Login</button>
                <p className={styles.forgotpassword}>Forgot password ?</p>
            </div>
            <p className={styles.close} onClick={() => setShowLoginForm(false)}>X</p>
        </div>
    )
}

export default Login