import React, { useContext } from 'react'
import { useLoaderData } from 'react-router-dom';
import { io } from 'socket.io-client';
import PostCard from '../../components/postCards/PostCard'
import PostForm from '../../components/postForm/PostForm'
import { AuthContext } from '../../contexts/authProvider/AuthProvider';


export default function Home() {
    const { user, loading } = useContext(AuthContext);
    const posts = useLoaderData();
    console.log(posts.length)

    console.log(user)
    loading && <div>Loading...</div>
    return (

        <div className='grid grid-cols-12 mt-12 mx-4'>
            <div className=' col-span-12 md:col-span-8'>
                {
                    user?.email && <PostForm />
                }
                {
                    posts.map(post => <PostCard key={post._id} post={post}></PostCard>)
                }
            </div>
            <div className=' col-span-0 md:col-span-4'>

            </div>

        </div>

    )
}
