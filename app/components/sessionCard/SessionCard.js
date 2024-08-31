import sessionCardStyles from './SessionCard.module.css'
import agenda from '@/assets/agenda.png'
import complete from '@/assets/success-icon.png'
import pending from '@/assets/pending.png'
import Switch from '../switch/Switch'
import Image from 'next/image'

const SessionCard = ({session, index, updateSessionStatus, activeAgenda, setActiveAgenda, type}) =>
{
    const handleAgenda = (e) =>
    {
        e.stopPropagation();
        setActiveAgenda(index)
    }

    return(
        <div className={sessionCardStyles.container}>
            <div className={sessionCardStyles.header}>
                <Image className={sessionCardStyles.agendaIcon} src={agenda} alt='agenda' onClick={handleAgenda}/>
                <p className={sessionCardStyles.sessionName}>Session {index+1}</p>
                {activeAgenda === index && <p className={sessionCardStyles.agenda}>{session.description}</p>}
            </div>
            <div className={sessionCardStyles.footer}>
                <p className={sessionCardStyles.status}>{session.status}</p>
                <Image className={sessionCardStyles.statusIcon} src={session.status === 'Upcoming' ? pending : complete} alt='img'/>
            </div>
            {/* <div className={sessionCardStyles.updateStatus}>
                <button onClick={()=> updateSessionStatus(session._id, session.status)}>Update</button>
            </div> */}
            {type === "admin" && 
            <Switch 
                id={session._id} status={session.status} 
                updateSessionStatus={updateSessionStatus}/>}
        </div>
    )
}

export default SessionCard