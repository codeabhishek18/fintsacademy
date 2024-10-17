'use client'

import Button from '../button/Button'
import { signOut } from "next-auth/react"

const Logout = () => 
{

  return <Button action={()=> signOut({callbackUrl: '/'})} label='Logout'/>
    
}

export default Logout