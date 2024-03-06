import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
export const SessionContext = createContext()

export function SessionProvider ({children}){

    const [user, setUser] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    useEffect(() => {
        const posibleUsuario = cookies.user
        if(posibleUsuario){
            setUser(posibleUsuario)
        }
    },[])

    function login(userData){
        setUser(userData)
        setCookie("user", userData)
    }

    function logout(){
        setUser(null)
        removeCookie("user")
    }

    return (
        <SessionContext.Provider value={{user,login,logout, cookies}}>
            {children}
        </SessionContext.Provider>
    )
}