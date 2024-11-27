import { useState } from 'react';
import styles from './styles.module.css'
import { usePathname, useRouter } from 'next/navigation';
import next from '@/assets/next-lg.png'
import simulation from '@/assets/simulation.png'
import edit from '@/assets/edit.png'
import Image from 'next/image';
import AssignForm from '../assignForm/AssignForm';
import Button from '../button/Button';

const SimulationCard = ({data}) =>
{
    const router = useRouter();
    const pathname = usePathname();
    
    console.log(data)

    return(
        <div className={styles.container}>
            <div className={styles.testWrapper}>
                <Image className={styles.test} src={simulation} alt='simulation'/>
            </div>
            <div className={styles.content}>
            <p className={styles.title}>{data.title +' ' +data.level}</p>
            
            <div className={styles.adminData}>
                <p className={styles.quiz}>Triggers : {data.simulation.length ?? '0'}</p>
                <p className={styles.quiz}>Batches : {data.batches.length}</p>
            </div>
            
            <div className={styles.footer}>
                <Button label='Batches' action={()=> router.push(`/admin/simulations/${data.title}`)}/>
            </div>
           </div>
        </div>
    )
}

export default SimulationCard