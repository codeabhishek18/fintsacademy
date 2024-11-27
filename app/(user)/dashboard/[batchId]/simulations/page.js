'use client'

import styles from './styles.module.css'  
import axios from "axios";
import { useSession } from "next-auth/react"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Loading from '@/app/components/loading/Loading';
import { toast } from 'sonner';
import Button from '@/app/components/button/Button';
import Link from 'next/link';

const Simulations = () =>
{
    const { data, status } = useSession();
    const [ simulation, setSimulation ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ response, setResponse ] = useState('');
    const params = useSearchParams();
    const triggerId = params.get('activityId');
    const router = useRouter();
    
    const getTrigger = async () =>
    {
        try
        {
            const url = `/api/triggerResponse/${triggerId}`
            const response = await axios.get(url);
            setSimulation(response.data);
        }
        catch(error)
        {
            toast.error(error.message)
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const handleResponse = async () =>
    {
        try
        {
            const url = `/api/triggerResponse/${triggerId}`
            const responseData = await axios.put(url, {response});
            toast.success(responseData.data.message)
            router.back();
        }
        catch(error)
        {
            console.log(error);
        }
    }
    
    useEffect(() => 
    {
        if(status === "authenticated")
            getTrigger();
        else if(status === "unauthenticated")
            router.push('/')
        else
            setIsLoading(true);
    }, [status]);

    if(status === 'loading' || isLoading)
        return <Loading/>

    return(
        <div className={styles.wrapper}>
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
                            <td className='border text-center p-2'><Link href='' className='text-blue-500 underline'>Fints360</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
           {simulation.status === 'Completed' ? <div className={styles.activity}>
                <p className='text-red-600 mb-2 font-bold'>Your Response</p>
                <p>{simulation.response}</p>
            </div> :
            <div className={styles.responseTab}>
                <textarea className={styles.responseInput} value={response} onChange={(e)=> setResponse(e.target.value)} placeholder="Enter your response here..."></textarea>
                <Button label='Submit Response' fullwidth={true} action={handleResponse}/>
            </div>}
          
        </div>
    )
}

const Loader = () =>
{
    return(
        <Suspense fallback={"loading..."}>
            <Simulations/>
        </Suspense>
    )
}

export default Loader