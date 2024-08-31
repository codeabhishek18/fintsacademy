import batchCardStyles from './BatchCard.module.css'
import deleteIcon from '../../assets/delete.png' 
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FormatDate } from '@/utility/FormatDate';

const BatchCard = ({type, data, removeBatch}) =>
{
    const router = useRouter();

    return(
        <div className={batchCardStyles.container}>
            <div className={batchCardStyles.header}>
                <p className={batchCardStyles.title}>{data.title}</p>
                {type === "admin" && <Image className={batchCardStyles.delete} src={deleteIcon} alt='delete' onClick={() => removeBatch(data._id)}/>}
            </div>
            <div className={batchCardStyles.content}>
                <p className={batchCardStyles.course}>{data.course.title}</p> 
                {type === "admin" && <p className={batchCardStyles.course}>Enrollments : {data.enrollments.length}</p>}
                <p className={batchCardStyles.course}>Status : {data.status}</p>
                <p className={batchCardStyles.date}>{FormatDate(data.startDate)} - {FormatDate(data.endDate)}</p>
            </div> 
            <div className={batchCardStyles.footer}>
               {type === "admin" ?
               <p className={batchCardStyles.details} onClick={()=> router.push(`/admin/batches/${data._id}`)}>Details</p> : 
               <p className={batchCardStyles.details} onClick={()=> router.push(`/user/dashboard/${data._id}`)}>View</p>}
            </div>
        </div>
    )
}

export default BatchCard