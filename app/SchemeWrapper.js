'use client'

import { SchemeProvider } from "@/contextapi/SchemeProvider"

const SchemeWrapper = ({children}) =>
{
    return(
        <SchemeProvider>
            {children}
        </SchemeProvider>
    )
}

export default SchemeWrapper