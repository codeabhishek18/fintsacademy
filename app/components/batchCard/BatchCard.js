import styles from './BatchCard.module.css'
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FormatDate } from '@/utility/FormatDate';
import deleteIcon from '@/assets/delete.png'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import Button from '../button/Button';

const BatchCard = ({type, level, data, participants, getBatches, batchId}) =>
{
    const router = useRouter();
    const pathname = usePathname();
    const [ showDialogue, setShowDialogue ] = useState(false);

    const deleteBatch = async () =>
    {
        try
        {
            const url = `/api/batch/${data._id}`
            const response = await axios.delete(url);
            setShowDialogue(false);
            toast.success(response.data.message);
            getBatches();
            
        }
        catch(error)
        {
            toast.error(error.message);
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image className={styles.image} src={data.course.imageURL} alt={data.title} layout='fill'/>
            </div>

            {showDialogue && 
            <div className={styles.dialogueWrapper}>
                <div className={styles.dialogue}>
                    <p className={styles.dialogueTitle}>Are you sure?</p>
                    <div className={styles.controls}>
                        <button className={styles.details} onClick={deleteBatch}>Yes</button>
                        <button className={styles.details} onClick={()=> setShowDialogue(false)}>No</button>
                    </div>
                </div>
            </div>}

            {level === 'admin' && type === 'batch' && <Image className={styles.deleteBatch} src={deleteIcon} alt='delete' onClick={()=> setShowDialogue(true)}/>}

            <div className={styles.content}>
                <p className={styles.course}>{data.course.title}</p>
                <p className={styles.title}>{data.sessions.length} lectures</p>
            </div>
            <div className={styles.footer}>
                {level === "admin" ? 
                (type === 'batch' ?
                <p className={styles.title}> Enrollments : {data.enrollments.length}</p> :
                <p className={styles.title}> Participants : {participants}</p>) : <p className={styles.status}>{data.status}</p>}
                
                {level === "admin" ?
                (type === 'batch' ? 
                
                <button className={styles.details} onClick={()=> router.push(`/admin/batches/${data.title}`)}>Details</button> :
                <Button label='View scores' action={()=> router.push(`${pathname}/${batchId}`)}/>) : 
                <Button label='View' action={()=> router.push(`/dashboard/${data.title}`)}/>}    
                
                <p className={styles.date}>{FormatDate(data.startDate)}</p>
            </div> 
        </div>
    )
}

export default BatchCard