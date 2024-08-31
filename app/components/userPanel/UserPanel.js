'use client'

import styles from './styles.module.css'
import dashboard from '@/assets/dashboard.png'
import assessment from '@/assets/assessment.png'
import forum from '@/assets/community.png'
// import chat from '../../assets/chat.png'
import settings from '@/assets/settings.png'
// import left from '../../assets/left.png'
// import right from '../../assets/right.png'
// import logout from '../../assets/logout.png'
// import {useState} from 'react'
// import Header from '../header/Header'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const navItems = [
    {
        id: 0,
        name: 'Dashboard',
        route: '/dashboard'
    },
    {
        id: 1,
        name: 'Asessment',
        route: '/assessment'
    },
    {
        id: 2,
        name: 'Forum',
        route: '/forum'
    },
    {
        id: 3,
        name: 'Profile',
        route: '/profile'
    },
]

export const navIcons = [
    {
        id: 0,
        name: 'Dashboard',
        src: dashboard,
        route: '/dashboard'
    },
    {
        id: 1,
        name: 'Assessment',
        src: assessment,
        route: '/assessment'
    },
    {
        id: 2,
        name: 'Forum',
        src: forum,
        route: '/forum'
    },
    {
        id: 3,
        name: 'Profile',
        src: settings,
        route: '/profile'
    }
]

const UserPanel = () =>
{

    const router = useRouter();
    const [ showName, setShowName ] = useState(-1)
    const [ active, setActive  ] = useState(0)

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.icons}>
                {navIcons.map((icon)=>
                (
                    <div className={active === icon.id ? `${styles.nav} ${styles.active}` : styles.nav} key={icon.id} onMouseEnter={()=> setShowName(icon.id)} onMouseLeave={()=> setShowName(-1)}>
                        <Image className={styles.icon} src={icon.src} alt='icon' key={icon.id} onClick={()=> 
                        {
                            setActive(icon.id)
                            router.push(icon.route)
                        }}/>
                        {showName === icon.id && <span className={styles.name}>{icon.name}</span>}
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default UserPanel