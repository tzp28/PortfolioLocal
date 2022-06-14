import React, {useContext, useState, useEffect, createContext} from 'react'
import {sUp, log, logOut,auth} from '../firebase'
const AuthContext = createContext();



export function useAuth(){
    return useContext(AuthContext);
}


export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)



    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setLoading(false)

        })

        return unsubscribe

    }, [])


    const value = {
        currentUser,
        sUp,
        log,
        logOut
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
