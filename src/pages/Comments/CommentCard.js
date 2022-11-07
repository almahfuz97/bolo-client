import React from 'react'
import pfp from '../../assets/man.png'

export default function CommentCard({ com }) {
    const { photoURL, displayName, comment } = com;
    return (
        <div className='flex p-4 '>
            <div className='relative w-20 mr-2'>
                <img src={pfp} alt="" className='absolute -z-10 top-0 w-12 h-12 rounded-full mr-4' />
                <img src={photoURL} alt="" className=' z-50 w-12 h-12 rounded-full mr-4' />

            </div>
            <div className='w-full space-y-0 border p-2 rounded'>
                <h3 className='font-bold'>{displayName}</h3>
                <p className='w-full'>
                    {comment}
                </p>
            </div>
        </div>
    )
}
