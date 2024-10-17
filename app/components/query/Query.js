import { FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material'
import styles from './styles.module.css' 
import Button from '../button/Button'
import Image from 'next/image'
import user from '@/assets/user.png'
import fints from '@/assets/fints.png'
import BoxReveal from '@/components/magicui/box-reveal'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

const Query = ({setShowMessage}) =>
{
    const [ form, showForm ] = useState(false);

    useEffect(()=>
    {
        setTimeout(()=>
        {
            showForm(true)
        },1500)
    },[])

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const name = formData.get('fullname')
        const email = formData.get('email')
        const query = formData.get('query')

        if(!name)
            return toast.error('Name is a required field')

        if(!email)
            return toast.error('Email is a required field')

        if(!query)
            return toast.error('Query is a required field')

        try
        {
            const url = '/api/query';
            const response = await axios.post(url, {name, email, query});
            toast.success(response.data.message);
            setShowMessage(false);
        }
        catch(error)
        {
            setShowMessage(false);
            toast.error(error.message);
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <Image className={styles.user} src={fints} alt='user'/>
            </div>
            <div className={styles.chat}>
                <BoxReveal boxColor='var(--primary-bg)'>
                    <div className={styles.header}>
                        <Image className={styles.user} src={user} alt='user'/>
                        <p className={styles.message}>Drop your query, so that we get back to you ASAP!</p>
                    </div>
                </BoxReveal>
                {form && 
                <BoxReveal boxColor='var(--primary-bg)'>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <Input className={styles.input} color='grey' sx={{color:'white'}} name='fullname' placeholder='Full name'/>
                        <Input className={styles.input} color='grey' sx={{color:'white'}} name='email' placeholder='Email'/>
                        <Input className={styles.input} color='grey' sx={{color:'white'}} name='query' placeholder='Query'/>
                        <Button label='Submit' action={()=>{}} size='small'/>
                    </form>
                </BoxReveal>}
            </div>
        </div>
    )
}

export default Query