import styles from './styles.module.css'
import agendaIcon from '@/assets/agenda.png'
import completeIcon from '@/assets/success-icon.png'
import pendingIcon from '@/assets/pending.png'
import Switch from '../switch/Switch'
import Image from 'next/image'

const SessionCard = ({session, index, updateSessionStatus, activeAgenda, setActiveAgenda, level}) =>
{
    const handleAgenda = (e) =>
    {
        e.stopPropagation();
        setActiveAgenda(index)
    }

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <Image className={styles.agendaIcon} src={agendaIcon} alt='agenda' onClick={handleAgenda}/>
                <p className={styles.sessionName}>Session {index+1}</p>
                {activeAgenda === index && <p className={styles.agenda}>{session.description}</p>}
            </div>
            <div className={styles.footer}>
                <p className={styles.status}>{session.status}</p>
                <Image className={styles.statusIcon} src={session.status === 'Upcoming' ? pendingIcon : completeIcon} alt='icon'/>
            </div>
            
            {level === "admin" && 
            <Switch id={session._id} status={session.status} updateSessionStatus={updateSessionStatus}/>}
        </div>
    )
}

export default SessionCard