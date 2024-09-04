'use client'

import { useEffect, useState } from 'react'
import styles from './Signup.module.css'
import axios from 'axios';
import registerIcon from '../../assets/register.png'
import { enqueueSnackbar } from 'notistack';
import { TextField } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDeatils } from '@/store/slices/courseReducer';

const Signup = ({setShowSignupForm, isSignUp, setisSignup}) =>
{
    const [ user, setUser ] = useState({firstname: '', lastname: '', email: '', password: '', contactNumber: ''})
    const [ errorMessage, setErrorMessage ] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();
    const loggedUser = useSelector((state => state.user.loggedUser))

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        setUser({...user, [name] : value});
    }

    useEffect(()=>
    {
        setErrorMessage('');
    },[user])

    const handleSubmit = async (e) =>
    {
        try
        {
            e.preventDefault();
            if(isSignUp)
            {
                if(!user.firstname)
                    return setErrorMessage('Firstname is required')
    
                if(!user.lastname)
                    return setErrorMessage('Lastname is required')

                if(!user.contactNumber)
                    return setErrorMessage('Phone is required') 
    
                if(!user.email)
                    return setErrorMessage('Email is required')
    
                if(!user.password)
                    return setErrorMessage('Password is required')

                const url = `/api/user/signup`
                const response = await axios.post(url, user);
                enqueueSnackbar(response.data.message)
                setisSignup(false);
            }
            else
            {
                if(!user.email)
                    return setErrorMessage('Email is required')
        
                if(!user.password)
                    return setErrorMessage('Password is required')

                const url = '/api/user/login'
                const response = await axios.post(url, {email: user.email, password: user.password}, { withCredentials: true });
                if(!response.data.user)
                {
                    enqueueSnackbar(response.data.message)
                    return
                }
                localStorage.setItem('user', JSON.stringify({id:response.data.user._id, name:response.data.user.firstname}));
                setShowSignupForm(false);
                enqueueSnackbar(response.data.message)
                if(response.data.user.role === 'visitor')
                    return window.location.reload()

                dispatch(setUserDeatils({user: response.data.user}))
                if(response.data.user.role === 'admin')
                    return router.push('/admin/dashboard') 

                console.log(response.data.user.role)
                router.push('/user/dashboard')   
            }
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.loginImage}>
                <Image className={styles.icon} src={registerIcon} alt='img'/>
                {isSignUp ? 
                <p className={styles.text}>Already a user? <span className={styles.link} onClick={()=> setisSignup(!isSignUp)}>Login</span></p> :
                <p className={styles.text}>New User? <span className={styles.link} onClick={()=> setisSignup(!isSignUp)}>Sign up</span></p> 
                }
            </div>
            <div className={styles.form}>
                {!isSignUp && <p className={styles.welcome}>Welcome back!</p>}
                {isSignUp && <div className={styles.signup}>
                    <TextField size='small' color='grey' label="Firstname" type="text" name="firstname" value={user.firstname} onChange={handleChange}/>
                    <TextField size='small' color='grey' label="Lastname" type="text" name="lastname" value={user.lastname} onChange={handleChange}/>
                    <TextField size='small' color='grey' label="Phone" type="text" name="contactNumber" value={user.contactNumber} onChange={handleChange}/>
                </div>}
                <TextField size='small' color='grey' label="Email" type="text" name="email" value={user.email} onChange={handleChange}/>
                <TextField size='small' color='grey' label="Password" type="password" name="password" value={user.password} onChange={handleChange}/>
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                <button className={styles.submit} onClick={handleSubmit} disabled={errorMessage}>{isSignUp ? 'Sign Up' : 'Login'}</button>
                {!isSignUp && <p className={styles.text}>OR</p>}
                {!isSignUp && <button className={styles.submit} onClick={handleSubmit}>Google</button>}
            </div>
            <p className={styles.close} onClick={() => setShowSignupForm(false)}>X</p>
        </div>
    )
}

export default Signup