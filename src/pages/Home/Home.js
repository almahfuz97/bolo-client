import React from 'react'
import PostCard from '../../components/postCards/PostCard'
import PostForm from '../../components/postForm/PostForm'

export default function Home() {

    return (

        <div className='grid grid-cols-12 mt-12 mx-4'>
            <div className=' col-span-12 md:col-span-8'>
                <PostForm />
                <PostCard></PostCard>
            </div>
            <div className=' col-span-0 md:col-span-4'>

            </div>

        </div>

    )
}
