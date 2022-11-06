import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authProvider/AuthProvider'

export default function JwtVerify({ children }) {
    const { user, logOut, loading } = useContext(AuthContext);
    const token = localStorage.getItem('bolo-token');
    console.log(user)
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {

        fetch(`http://localhost:5000/services?email=${user?.email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    setIsValid(true)
                }
                else {
                    logOut();
                    setIsValid(false)
                }

            })
    }, [user?.email, logOut])

    if (loading) return <div>loading...</div>
    if (isValid) return children


}
