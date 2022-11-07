import React, { useContext, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import PostCard from '../../components/postCards/PostCard';
import { AuthContext } from '../../contexts/authProvider/AuthProvider';
import pfp from '../../assets/man.png'
import CommentCard from './CommentCard';
import { Toast } from 'flowbite-react';


export default function Comments() {
    const post = useLoaderData();
    const { user, loading } = useContext(AuthContext);
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState();
    const [toast, setToast] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/comments?postId=${post._id}`)
            .then(res => res.json())
            .then(data => {
                setAllComments(data);
            })
            .catch(err => console.log(err))
    }, [])

    const handleComment = () => {
        if (comment === '') return;

        const commentInfo = {
            email: user.email,
            postId: post._id,
            displayName: user.displayName,
            photoURL: user.photoURL,
            comment,
        }
        fetch('http://localhost:5000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.acknowledged)
                if (data.acknowledged) {
                    console.log('successfull')

                    setToast(true)
                    setTimeout(() => {
                        setToast(false)
                    }, 1000);
                    setComment('');
                    fetch(`http://localhost:5000/comments?postId=${post._id}`)
                        .then(res => res.json())
                        .then(data => {
                            setAllComments(data);
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }

    const commentOnChange = (event) => {
        setComment(event.target.value)
    }

    user && <div>Loading...</div>
    return (
        <div className='mt-8 grid grid-cols-1 md:grid-cols-12 gap-4 mx-4'>
            <div className=' col-span-1 md:col-span-6 relative'>
                <div className=' w-full'>
                    <PostCard post={post}></PostCard>

                </div>
            </div>
            <div className=' md:col-span-6'>
                {
                    <Toast className={` absolute top-4 ${toast ? 'flex' : 'hidden'}`}>

                        <div className="ml-3 text-sm font-normal">
                            Comment Successfull
                        </div>

                    </Toast>
                }
                <div>
                    <div className='flex items-center space-x-3'>
                        <div className='relative'>
                            <img src={pfp} alt="" className='absolute -z-10 top-0 w-16 h-16 rounded-full mr-4' />
                            <img src={user?.photoURL} alt="" className=' z-50 w-16 h-16 rounded-full mr-4' />

                        </div>
                        <div className=' w-4/5'>
                            <input onChange={commentOnChange} name="comment" value={comment} type="text" className='border rounded-3xl w-full' placeholder='write your comment...' />
                        </div>
                    </div>
                    <div className=' flex justify-end'>
                        <button onClick={handleComment} className='border rounded-lg drop-shadow-md hover:bg-slate-50 text-end p-2'>Comment</button>
                    </div>
                </div>
                <div>
                    <h1 className=' font-bold text-center my-4 text-xl'>Comments</h1>
                </div>
                <div>
                    {
                        allComments && allComments.map(com => <CommentCard key={com._id} com={com}></CommentCard>)
                    }
                </div>
            </div>
        </div>
    )
}
