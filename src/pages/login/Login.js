import { GoogleAuthProvider } from 'firebase/auth'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/authProvider/AuthProvider'

const provider = new GoogleAuthProvider();
export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, providerSignIn, loginWithEmail } = useContext(AuthContext);
    const location = useLocation();
    const from = location?.state?.from || '/';
    const navigate = useNavigate();
    const [err, setErr] = useState('');

    // login with email pass
    const onSubmit = data => {
        console.log(data)
        loginWithEmail(data.email, data.password)
            .then(result => {
                const u = result.user;
                const userEmail = u.email;
                console.log(u);
                setErr('')

                fetch("https://bolo-server.vercel.app/jwt", {
                    method: 'POST',
                    headers: {
                        "content-type": 'application/json'
                    },
                    body: JSON.stringify({ userEmail })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        navigate(from, { replace: true });
                        localStorage.setItem('bolo-token', data.token)
                    })
                    .catch(err => console.log(err))

            })
            .catch(err => {
                console.log(err);
                setErr("Invalid Credentials!")
            })

    }
    // goolgle sign in
    const handleGoogle = () => {
        providerSignIn(provider)
            .then(result => {
                const user = result.user;
                const userEmail = {
                    email: user.email,
                }
                if (user) {

                    fetch("https://bolo-server.vercel.app/jwt", {
                        method: 'POST',
                        headers: {
                            "content-type": 'application/json'
                        },
                        body: JSON.stringify({ userEmail })
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            navigate(from, { replace: true });
                            localStorage.setItem('bolo-token', data.token)
                        })
                        .catch(err => console.log(err))
                }

                console.log(user.email)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='flex justify-center mt-12 mx-4'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 border p-8 rounded-lg">
                <div>
                    <div className=' text-red-500'>{err}</div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email1"
                            value="Email"
                        />
                    </div>
                    <TextInput
                        name="email"
                        type="email"
                        placeholder="Your email"
                        {...register('email', { required: true })}

                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password"
                            value="Your password"
                        />
                    </div>
                    <TextInput
                        name="password"
                        type="password"
                        {...register('password', { required: true })}
                    />
                </div>

                <Button type="submit">
                    Submit
                </Button>
                <div className="flex items-center">
                    <small>Don't have an account? <Link to='/register'><span className=' text-red-500 hover:text-red-600'>Register Here</span></Link></small>
                </div>
                <div className="flex items-center justify-center">
                    <p className='  '>Or</p>
                </div>
                <div className="flex items-center justify-center">
                    <button onClick={handleGoogle} className=' rounded-lg hover:shadow hover:bg-slate-100 p-2 text-red-400'>Continue with Google</button>
                </div>
            </form>
        </div>
    )
}
