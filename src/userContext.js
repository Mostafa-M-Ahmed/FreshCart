import { createContext, useState } from "react";



export const userContext = createContext(null)

export function UserContextProvider({ children }) {

    let [user,setIsUser]  = useState(null) 
    let [login,setLogin]  = useState(null) 
    let [isOpen,setOpen] = useState(false)
   
    return <userContext.Provider value={{user,setIsUser,login,setLogin,isOpen,setOpen}}>
        {children}
    </userContext.Provider>
}