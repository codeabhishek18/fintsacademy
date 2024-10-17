import styles from './styles.module.css'
import closeIcon from '@/assets/close.png'
import Image from "next/image"
import { signOut, useSession } from 'next-auth/react'
import Button from '../button/Button'

const LoggedUser = ({setShowDetails}) =>
{
    const { data } = useSession()

    return(
        <div className={styles.container}>
            <Image className={styles.close} src={closeIcon} alt='close' onClick={()=> setShowDetails(false)}/>
            <span>{data.user.email}</span>
            <span>{data.user.name}</span>
            <Button action={()=> signOut({callbackUrl: '/'})} label='Logout'/>
        </div>
    )
} 

export default LoggedUser