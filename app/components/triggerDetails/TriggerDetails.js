import Link from 'next/link'
import styles from './styles.module.css'  

const TriggerDetails = ({simulation}) =>
{

    return(
        <div className={styles.activity}>
            <p className='text-red-600 mb-2 font-bold'>Trigger</p>
            {simulation.trigger.description}
            <table className='w-full mt-4 flex'>
                <thead className='w-[40%]'>
                    <tr className='flex flex-col'>
                        <th className='border text-center p-2'>Case</th>
                        <th className='border text-center p-2'>TriggerId</th>
                        <th className='border text-center p-2'>Type</th>
                        <th className='border text-center p-2'>Filter</th>
                    </tr>
                </thead>
                <tbody className='w-[60%]'>
                    <tr className='flex flex-col'>
                        <td className='border text-center p-2'>History</td>
                        <td className='border text-center p-2'>{simulation.trigger.triggerId.toUpperCase()}</td>
                        <td className='border text-center p-2'>{simulation.trigger.type}</td>                            
                        <td className='border text-center p-2'><Link href='https://fints360.vercel.app/' legacyBehavior><a target='_blank'  className='text-blue-500 underline'>Fints360</a></Link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TriggerDetails