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
    const [ isLoading, setIsLoading ] = useState(true);
    const router = useRouter();

    const getUserData = async () =>
    {
        try
        {
            setIsLoading(true);
            const url = `/api/user/${data.user.id}`
            const response = await axios.get(url);
            setUserData(response.data)
        }
        catch(error)
        {
            toast.error(error.message);
        }
        finally
        {
            setIsLoading(false);
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

    console.log(userData)

    if(status === 'loading' || isLoading)
        return <Loading/>
        
    return(
            <div className={styles.enrollments}>
                {userData.enrollments.map((data)=>
                (
                    <BatchCard data={data.batch} enrollmentId={data._id} key={data._id}/>
                ))}
            </div>
    )
}

export default Dashboard