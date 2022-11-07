import React, { createContext, useContext, useEffect, useState } from 'react'
import app from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updateProfile } from 'firebase/auth'

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

    // 
    const updateUser = (info) => {
        return updateProfile(auth.currentUser, info);
    }
    // log out
    const logOut = () => {
        localStorage.removeItem('bolo-token');
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

        return () => unsubscribe();
    }, [])

    const authInfo = { user, loading, createUser, loginWithEmail, logOut, providerSignIn, updateUser };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}
