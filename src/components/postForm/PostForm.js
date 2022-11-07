import { Button, Checkbox, Label, Modal, TextInput, on } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/authProvider/AuthProvider';

export default function PostForm() {
    const { user, loading } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        const date = new Date();
        const date2 = Date.now();

        console.log(date2);
        const time = date.getMilliseconds();
        const postData = {
            ...data,
            email: user.email,
            displayName: user.displayName,
            profileImg: user.photoURL,
            createdAt: Date.now(),
        }

        fetch('http://localhost:5000/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    alert('Post created succesfully');
                    setVisible(false);
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='border py-8 px-4 rounded mb-12'>
            <div className='flex'>
                <img src="https://i.ibb.co/d68QTRJ/Realistic-human-heart.jpg" alt="" className='w-8 h-8 rounded-full mr-4' />
                <button onClick={() => setVisible(true)} className='border rounded-3xl w-full opacity-50 text-start pl-4 py-1 hover:bg-slate-100'>what's on your mind?</button>

                <Modal
                    show={visible}
                    size="md"
                    popup={true}
                    onClose={() => setVisible(false)}
                >
                    <Modal.Header />

                    <Modal.Body>
                        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                            <div className='flex'>
                                <img src="https://i.ibb.co/d68QTRJ/Realistic-human-heart.jpg" alt="" className='w-8 h-8 rounded-full mr-4' />
                                <h3 className=' font-bold'>Abdullah</h3>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* title */}
                                <input
                                    type='text'
                                    {...register("title", {
                                        required: true, maxLength: {
                                            value: 75,
                                            message: 'The maximum character of title is 75'
                                        }
                                    })}
                                    placeholder="Post title" className='border p-4 rounded-xl w-full' /> <br />
                                {/* error */}
                                <p className=' text-red-600'>{errors?.title?.message}</p>

                                {/* post content text area */}
                                <textarea
                                    type='text'
                                    {...register("postContent", {
                                        required: true, minLength: {
                                            value: 10,
                                            message: 'The minimum length of post is 10'
                                        }
                                    })}
                                    placeholder="what's on your mind?"
                                    className='border min-h-[100px] rounded-xl w-full mt-4 text-sm opacity-80' />
                                <br />
                                <p className=' text-red-600'>{errors?.postContent?.message}</p>

                                <input type='text'
                                    {...register("imageUrl")}
                                    placeholder="img url" className='border p-4 rounded-xl w-full' /> <br />

                                <input className=' border rounded-lg mt-4 p-4 w-full bg-blue-400 text-white font-bold hover:bg-blue-600 cursor-pointer' type="submit" />
                            </form>

                        </div>
                    </Modal.Body>
                </Modal>

            </div>
        </div>
    )
}
