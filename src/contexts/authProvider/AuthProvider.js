import React, { createContext, useContext, useEffect, useState } from 'react'
import app from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

// auth context
export const AuthContext = createContext();
const auth = getAuth(app)

export default function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    // create user/ register user
    const createUser = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    }
    // login with email and pass
    const loginWithEmail = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass);
    }
    // log out
    const logOut = () => {
        return signOut(auth);
    }
    // sign in with google
    const providerSignIn = (provider) => {
        return signInWithPopup(auth, provider);
    }

    // on auth state changed
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser || currentUser === null) {
                setUser(currentUser);
                setLoading(false);
            }
        })
    }, [])

    const authInfo = { user, loading, createUser, loginWithEmail, logOut, providerSignIn };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}
