import { GoogleAuthProvider } from 'firebase/auth';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/authProvider/AuthProvider'

const provider = new GoogleAuthProvider();

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, createUser, logOut, updateUser } = useContext(AuthContext);
    const location = useLocation();
    const from = location?.state?.from || '/';
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                if (user.email) alert('Your account created successfully. Login to access')
                const userInfo = {
                    displayName: data.fullName, photoURL: data.url,
                }
                updateUser(userInfo)
                    .then(() => {
                        console.log('profile updated successfully');
                        logOut();

                    })
                    .catch(err => console.log(err))
                navigate('/login');
            })
            .catch(err => console.log(err))

    }


    return (
        <div className='flex justify-center mt-12 mx-4'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 border p-8 rounded-lg">
                <h1 className=' text-center font-bold mb-4 text-xl'>Register</h1>

                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="fullName"
                            value="Full Name"
                        />
                    </div>
                    <TextInput
                        name="fullName"
                        type="text"
                        placeholder='Full Name'
                        {...register('fullName', { required: true })}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email"
                            value="Email"
                        />
                    </div>
                    <TextInput
                        name="email"
                        type="email"
                        placeholder='Your email'
                        {...register('email', { required: true })}

                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="url"
                            value="Profile photo URL"
                        />
                    </div>
                    <TextInput
                        name="url"
                        type="text"
                        placeholder='Your photo url'
                        {...register('url')}

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
                    <small>Already have an account? <Link to='/login'><span className=' text-red-500 hover:text-red-600'>Login Here</span></Link></small>
                </div>

            </form>
        </div>
    )
}
