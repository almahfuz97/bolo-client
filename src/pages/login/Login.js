import { GoogleAuthProvider } from 'firebase/auth'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/authProvider/AuthProvider'

const provider = new GoogleAuthProvider();
export default function Login() {
    const { user, providerSignIn } = useContext(AuthContext);
    const location = useLocation();
    const from = location?.state?.from || '/';
    const navigate = useNavigate();

    // goolgle sign in
    const handleGoogle = () => {
        providerSignIn(provider)
            .then(result => {
                const user = result.user;
                const userEmail = {
                    email: user.email,
                }
                if (user) {

                    fetch("http://localhost:5000/jwt", {
                        method: 'POST',
                        headers: {
                            "content-type": 'application/json'
                        },
                        body: JSON.stringify({ userEmail })
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            localStorage.setItem('bolo-token', data.token)
                            navigate(from, { replace: true });
                        })
                        .catch(err => console.log(err))
                }

                console.log(user.email)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='flex justify-center mt-12 mx-4'>
            <form className="flex flex-col gap-4 border p-8 rounded-lg">
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email1"
                            value="Your email"
                        />
                    </div>
                    <TextInput
                        id="email1"
                        type="email"
                        placeholder="name@flowbite.com"
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password1"
                            value="Your password"
                        />
                    </div>
                    <TextInput
                        id="password1"
                        type="password"
                        required={true}
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
