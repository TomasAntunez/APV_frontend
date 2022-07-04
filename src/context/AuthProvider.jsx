import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axios'

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [ loading, setLoading ] = useState(true)
    const [ auth, setAuth ] = useState({})

    useEffect( () => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('token')

            if( !token ) {
                setLoading(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                } 
            }

            try {
                const { data } = await axiosClient('/veterinarios/perfil', config)

                setAuth(data)

            } catch (error) {
                console.log(error.response.data.msg)

                setAuth({})
            }

            setLoading(false)
        }
        authenticateUser()
    }, [])

    const signOff = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const updateProfile = async info => {
        const token = localStorage.getItem('token')

        if( !token ) {
            setLoading(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            } 
        }

        try {
            const url = `/veterinarios/perfil/${info._id}`
            await axiosClient.put(url, info, config)

            return {
                msg: 'Almacenado correctamente'
            }

        } catch (error) {
            return {
                msg: error.response.data.msg,
                    error: true
                }
        }
    }

    const savePassword = async info => {
        const token = localStorage.getItem('token')

        if( !token ) {
            setLoading(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            } 
        }

        try {
            const url = '/veterinarios/actualizar-password'
            const { data } = await axiosClient.put(url, info, config)

            console.log(data)

            return {
                msg: data.msg
            }

        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                signOff,
                updateProfile,
                savePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext