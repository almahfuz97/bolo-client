import React from 'react'

export default function PostCard() {
    return (
        <div className='border rounded'>
            <div className='flex p-4'>
                <img src="https://i.ibb.co/d68QTRJ/Realistic-human-heart.jpg" alt="" className=' w-12 h-12 rounded-full mr-4' />
                <div className=' space-y-0'>
                    <h3 className='font-bold'>Abdullah</h3>
                    <small className=' text-xs opacity-50'>Student</small>
                </div>
            </div>
            <div className='mt-4'>
                <div className='px-4'>
                    <h2 className=' font-bold text-2xl'>How to prevent cancer?</h2>
                    <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus id quibusdam earum adipisci, in doloremque nobis architecto hic voluptas cupiditate!</p>
                </div>
                <img src="https://i.ibb.co/d68QTRJ/Realistic-human-heart.jpg" alt="" className='f w-full mt-4' />
            </div>
        </div>
    )
}
