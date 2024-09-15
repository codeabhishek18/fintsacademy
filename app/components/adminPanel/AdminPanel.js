'use client'

import { usePathname, useRouter } from 'next/navigation';
import styles from './AdminPanel.module.css'
import { useEffect, useState } from 'react';
import { adminPanelList } from '@/utility/adminPanelList';
import right from '@/assets/next.png'
import left from '@/assets/back.png'
import Image from 'next/image';

const AdminPanel = () =>
{
    const router = useRouter();
    const [ active, setActive ] = useState(0);
    const [ slide, setSlide ] = useState(true);
    const pathname = usePathname();

    useEffect(() =>
    {
        const path = pathname.split('/')[2]
        const route = adminPanelList.find((list)=> list.title.toLowerCase() === path);
        setActive(route.id);
    },[])

    return(
        <ul className={slide ? `${styles.container} ${styles.left}` : `${styles.container} ${styles.right}` }>
            {adminPanelList.map((list) =>
                <li className={list.id === active ? `${styles.list} ${styles.active}` : styles.list} 
                    key={list.id} onClick={()=> {setActive(list.id); router.push(list.navigation)}}>{
                    list.title}
                </li>
            )}
            <Image className={slide ? `${styles.pop} ${styles.slide}` : styles.slide } src={slide ? right : left } onClick={()=> setSlide(!slide)}/>
        </ul>
    )
}

export default AdminPanel