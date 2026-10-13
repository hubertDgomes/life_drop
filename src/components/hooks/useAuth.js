import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { editAvailable, editLastDonate, editNote, getMe, login, logout, signup } from "../lib/api/auth"

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    const { user, setUser, loading, setLoading } = context

    const handleSignup = async (formData) => {
        setLoading(true)
        try {
            const res = await signup(formData)
            const loginUser = res.user || res.data || res
            setUser(loginUser)
            return loginUser
        }
        catch (err) {
            setUser(null)
            throw err
        }
        finally {
            setLoading(false)
        }
    }
    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const res = await login({ email, password })
            const loginUser = res.user || res.data || res
            setUser(loginUser)
            return loginUser
        }
        catch (err) {
            setUser(null)
            throw err
        }
        finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        }
        catch (err) {
            console.log(err)
            throw err
        }
        finally {
            setLoading(false)
        }
    }

    const checkUser = async () => {
        setLoading(true)
        try {
            const res = await getMe()
            const userData = res.data || res.user || res
            setUser(userData)
            return userData
        }
        catch {
            setUser(null)
            return null
        }
        finally {
            setLoading(false)
        }
    }

    const changeAvailable = async (is_available) => {
        setLoading(true)
        try {
            // 1. save the change on the server
            await editAvailable({ is_available })

            // 2. get the fresh user from the server and put it in state
            const res = await getMe()
            const userData = res.data || res.user || res
            setUser(userData)
            return userData
        }
        catch {
            return null
        }
        finally {
            setLoading(false)
        }
    }


    const changeDate = async (last_donation_date) => {
        setLoading(true)
        try {
            // 1. save the change on the server
            await editLastDonate({ last_donation_date })

            // 2. get the fresh user from the server and put it in state
            const res = await getMe()
            const userData = res.data || res.user || res
            setUser(userData)
            return userData
        }
        finally {
            setLoading(false)
        }
    }

    const changeNote = async (health_notes) => {
        setLoading(true)
        try {
            // 1. save the change on the server
            await editNote({ health_notes })

            // 2. get the fresh user from the server and put it in state
            const res = await getMe()
            const userData = res.data || res.user || res
            setUser(userData)
            return userData
        }
        finally {
            setLoading(false)
        }
    }

    return {
        user, setUser, loading, setLoading, handleLogin, handleLogout, handleSignup, checkUser, changeAvailable,changeDate,changeNote
    }

}


export default useAuth