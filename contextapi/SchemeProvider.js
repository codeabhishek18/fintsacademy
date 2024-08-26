const { createContext, useState, useContext } = require("react");

const SchemeContext = createContext();

const SchemeProvider = ({children}) =>
{
    const [ scheme, setScheme ] = useState('dark');

    const updateScheme = () =>
    {
        setScheme((prev)=> prev === 'dark' ? 'light' : 'dark')
    }

    return(
        <SchemeContext.Provider value={{ scheme, updateScheme }}>
            {children}
        </SchemeContext.Provider>
    )
}

const useScheme = () =>
{
    return useContext(SchemeContext);
}

export { SchemeProvider, useScheme }