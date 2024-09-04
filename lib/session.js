'use client'

import { useSession } from "next-auth/react";

export const loggedUser = async () =>
{
    const {data} = useSession();
    return data?.user
}