'use client'

import styles from './styles.module.css' 
import { signOut } from "next-auth/react"

const Logout = () => 
{

  return (
    <div>
        <button className={styles.logout} onClick={()=> signOut({callbackUrl: '/'})}>Logout</button>
    </div>
  )
}

export default Logout