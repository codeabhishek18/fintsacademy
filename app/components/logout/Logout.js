'use client'

import { doLogout } from "@/app/action"
import styles from './styles.module.css' 
import { useSession } from "next-auth/react"

const Logout = () => 
{

  const handleLogout = () =>
  {
    doLogout();
  }

  return (
    <div>
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout