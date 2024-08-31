'use client'

import navbar from './Navbar.module.css'
import dashboard from '../../assets/dashboard.png'
import test from '../../assets/test.png'
import forum from '../../assets/forum.png'
import chat from '../../assets/chat.png'
import settings from '../../assets/settings.png'
import left from '../../assets/left.png'
import right from '../../assets/right.png'
import logout from '../../assets/logout.png'
import {useState} from 'react'
import Header from '../header/Header'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const navItems = [
    {
        id: 0,
        name: 'Dashboard',
        route: '/user/dashboard'
    },
    {
        id: 1,
        name: 'Tests'
    },
    {
        id: 2,
        name: 'Forum',
        route: '/user/forum'
    },
    {
        id: 3,
        name: 'Profile',
        route: 'user/profile'
    },
]

export const navIcons = [
    {
        id: 1,
        src: dashboard,
        route: '/user/dashboard'
    },
    {
        id: 2,
        src: test,
        route: '/user/assessment'
    },
    {
        id: 3,
        src: forum,
        route: '/user/forum'
    },
    {
        id: 4,
        src: settings,
        route: '/user/profile'
    }
]

const Navbar = () =>
{

    const router = useRouter();
    // const [slide, setSlide] = useState(true)
    // const [active, setActive] = useState(0)

    return(
        <div className={navbar.container}>
            <div className={navbar.wrapper}>
                <div className={navbar.icons}>
                {navIcons.map((icon)=>
                (
                    <Image className={navbar.icon} src={icon.src} alt='icon' key={icon.id} onClick={()=> router.push(icon.route)}/>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Navbar