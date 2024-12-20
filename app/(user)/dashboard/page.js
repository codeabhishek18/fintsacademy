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
            const url = `/api/user/${data.user.id}`
            const response = await axios.get(url);
            localStorage.setItem('userName', response.data.name)
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

    console.log(userData)

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
            <div className={styles.enrollments}>
                {userData.enrollments.map((enrollment)=>
                (
                    <BatchCard data={enrollment.batch} enrollmentId={enrollment._id} key={enrollment._id}/>
                ))}
            </div>
    )
}

export default Dashboard