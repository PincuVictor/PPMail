import { browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    setPersistence(auth, browserSessionPersistence)

    function signup(email, password) {
         return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
         return signInWithEmailAndPassword(auth, email, password) 
    }

    function logout() {
        return signOut(auth)
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
        })
        return unsubscribe
    }, [])
    

    const value = {
        currentUser,    
        signup,
        login,
        logout
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
