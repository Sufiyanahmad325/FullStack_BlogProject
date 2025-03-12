import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'


const UserContex = createContext()

function UserContextProvider({ children }) {


      const [accessData, setAccessData] = useState({})
    

      
      const loadLocalStorgeData = () => {
        const storedUserData = JSON.parse(localStorage.getItem('user')) || [];
        setAccessData(storedUserData);
        }
        
        
    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('user')) || [];
        setAccessData(storedUserData);
    }, []);
    


    
    return (
        <UserContex.Provider value={{loadLocalStorgeData, setAccessData, accessData}}>
            {children}
        </UserContex.Provider>
    )
}

export { UserContex, UserContextProvider }

export const userDetails = () => {
    const context = useContext(UserContex)
    return context
}