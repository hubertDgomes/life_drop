import { createContext, useEffect, useState } from "react"
import { getMe } from "../lib/api/auth"

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(true)
    
    useEffect(()=>{
        const checkInitialAuth = async () => {
            setLoading(true)
            try{
                const data = await getMe()
                setUser(data || data)
            }
            catch(err){
                setUser(null)
            }
            finally{
                setLoading(false)
            }
        }
        checkInitialAuth()
    },[])
    return(
        <>
        <AuthContext.Provider value={{user , setUser, loading , setLoading}}>
            {children}
        </AuthContext.Provider>
        </>
    )
}

export default AuthProvider