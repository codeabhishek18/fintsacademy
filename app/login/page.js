'use client'

import styles from './Login.module.css'
import fints from '../../assets/fints.png'
import Image from 'next/image';
import successicon from '../../assets/success-icon.png'
import erroricon from '../../assets/error-icon.png'
import { CircularProgress, Input } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Header from '../components/header/Header';
import GoogleAuth from '../components/googleAuth/GoogleAuth';
import { signIn } from 'next-auth/react';

export default function Page() {
    return (
      <Suspense fallback={null}>
        <Login />
      </Suspense>
    );
  }

const Login = () =>
{   
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ isError, setError ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState('')
    const [ success, setSuccess ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
    const error = searchParams.get('error');

    useEffect(() => 
    {
        if (error) 
        {
            setError(true)
            switch (error) 
            {
                case "CredentialsSignin":
                setErrorMessage("Invalid username or password");
                break;
                case "Something went wrong!":
                setErrorMessage("Something went wrong! Please try again.");
                break;
                default:
                setErrorMessage("An unexpected error occurred");
            }
        }
    }, [error]);

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setSuccess(false)
        setSuccessMessage('')

        const formData = new FormData(e.currentTarget);

        if(!formData.get('email')) 
        {
            setError(true);
            setErrorMessage('Email is required')
            return
        } 

        if(!formData.get('password')) 
        {
            setError(true);
            setErrorMessage('Password is required')
            return
        } 

        setError(false)
        setErrorMessage('');
        setIsLoading(true)

        signIn('credentials', 
        {
            email : formData.get('email'), 
            password: formData.get('password'),
            callbackUrl
        })
        setIsLoading(false);
    }

    return(
        <div className={styles.wrapper}>
           <div className={styles.container}> 
                <div className={styles.header}>
                    <Image className={styles.logo} src={fints} alt='logo' onClick={()=> router.push('/')}/>
                    <p className={styles.welcome}>Welcome back!</p>
                </div>
                <div className={styles.form}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <Input className={styles.inputs} sx={{color:'white'}} color='grey' size='small' placeholder="Email" type="text" name="email" variant='filled'/>
                        <Input className={styles.inputs} sx={{color:'white'}} color='grey' size='small' placeholder="Password" type="password" name="password" variant='filled'/>
                        {isError && 
                        <div className={styles.error}>
                            <Image className={styles.erroricon} src={erroricon} alt='error'/>
                            <p className={styles.errorMessage}>{errorMessage}</p>
                        </div>}
                        {success && 
                        <div className={styles.success}>
                            <Image className={styles.successicon} src={successicon} alt='success'/>
                            <p className={styles.successMessage}>{successMessage}</p>
                        </div>}
                        <button className={styles.submit} type='submit'>Login</button>
                        {isLoading &&
                        <div className={styles.spinner}>
                            <CircularProgress sx={{color: '#D4313D'}} />
                        </div>}
                    </form>
                    <p className={styles.option}>or</p>
                    <GoogleAuth setIsLoading={setIsLoading}/>
                </div>
                <p className={styles.noaccount} onClick={()=> router.push('/signup')}>Don't have an account? <span className={styles.link}>Sign up</span></p>
           </div>
        </div>
    )
}
