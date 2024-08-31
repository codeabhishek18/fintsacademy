'use client'

import header from './Header.module.css'
import { useEffect, useState } from 'react';
import userIcon from '../../assets/user.png'
import fints from '../../assets/fints.png'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Signup from '../signup/Signup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDeatils } from '@/store/slices/userReducer';

const Header = () =>
{
    const [ showSignupForm, setShowSignupForm ] = useState(false);
    const [ isSignUp, setisSignup ] = useState(false)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.loggedUser);
    const router = useRouter();

    useEffect(()=>
    {        
        getUser();
    },[])

    const getUser = async () =>
    {
        const value = localStorage.getItem('user')
        if(value)
        {
            const user = JSON.parse(value)
            const url = `/api/user/${user.id}`
            const response = await axios.get(url);
            console.log(response.data);
            dispatch(setUserDeatils({user: response.data}))       
        }
    }

    const logUserOut = async () =>
    {
        try
        {
            // const url = `${baseUrl}/user/logout`
            // await axios.post(url, {} ,{ withCredentials: true });
            localStorage.removeItem('user');
            router.push('/')
        }
        catch(error)
        {
            console.log(error.message)
        }
    }

    return(
        <div className={header.container}>
            <Image className={header.title} src={fints} alt='logo' onClick={() => router.push('/')}/>
             
            <div className={header.user}> 
                {user.role !== 'visitor' && <p className={header.logout}>Dashboard</p>}
                <p>{user.firstname}</p>
                <Image className={header.profile} src={userIcon} alt='profile'/>
                <p className={header.logout} onClick={logUserOut}>Logout</p>
            </div> 
            <div className={header.user}>
                <p className={header.logout} onClick={()=> router.push('/login')}>Login</p>
                <p className={header.logout} onClick={()=> router.push('/register')}>Sign Up</p>
            </div>
            {showSignupForm && 
            <div className={header.form}>
                <Signup setShowSignupForm={setShowSignupForm} setisSignup={setisSignup} isSignUp={isSignUp}/>
            </div>}          
        </div>
    )
}

export default Header