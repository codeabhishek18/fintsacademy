'use client'

import { useRouter } from 'next/navigation';
import { adminPanelList } from '../../utility/adminPanelList'
import adminPanelStyles from './AdminPanel.module.css'
import { useState } from 'react';

const AdminPanel = () =>
{
    const router = useRouter();
    const [active, setActive] = useState(0);
    const [ slide, setSlide ] = useState(false)

    return(
        <ul className={slide ? `${adminPanelStyles.container} ${adminPanelStyles.left}` : `${adminPanelStyles.container} ${adminPanelStyles.right}` }>
            {adminPanelList.map((list) =>
                <li className={list.id === active ? `${adminPanelStyles.list} ${adminPanelStyles.active}` : adminPanelStyles.list} 
                    key={list.id} onClick={()=> {setActive(list.id); router.push(list.navigation)}}>{
                    list.title}
                </li>
            )}
            <button className={adminPanelStyles.slide} onClick={()=> setSlide(!slide)}>Slide</button>
        </ul>
    )
}

export default AdminPanel