'use client'

import BatchCard from "@/app/components/batchCard/BatchCard";
import styles from './styles.module.css'
import axios from "axios";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/components/loading/Loading";
import { toast } from "sonner";

const Dashboard = () =>
{
    
    const { data, status } = useSession();
    const [ userData, setUserData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();

    const getUserData = async () =>
    {
        try
        {
            setIsLoading(true);
            const url = `/api/user/${data.user.id}`
            const response = await axios.get(url);
            setUserData(response.data)
            setIsLoading(false);
        }
        catch(error)
        {
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    useEffect(() => 
    {
        if(status === "authenticated")
            getUserData();
        else if(status === "loading")
            setIsLoading(true);
        else
            router.push('/')            
    }, [status]);
    

    if(status === 'loading' || isLoading)
        return <Loading/>
        
    return(
        <>
            {userData &&
            <div className={styles.enrollments}>
                {userData?.enrollments?.map((data)=>
                (
                    <BatchCard data={data.batch} key={data._id}/>
                ))}
            </div>}
        </>
    )
}

export default Dashboard