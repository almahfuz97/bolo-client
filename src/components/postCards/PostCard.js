import React, { useContext, useEffect, useState } from 'react'
import pfp from '../../assets/man.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../contexts/authProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'flowbite-react';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

export default function PostCard({ post }) {

    const { createdAt, email, profileImg, imageUrl, title, postContent, displayName, _id, likes, likedby } = post;
    const { user, loading } = useContext(AuthContext);
    const [likeToggle, setLikeToggle] = useState(false);
    const [totalLikes, setTotalLikes] = useState(likes)
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (likedby[user?.email]) setLikeToggle(true)
        else setLikeToggle(false)
    }, [user])

    const handleLike = (id) => {
        if (!user?.email) {
            setVisible(true);
        } else {

            console.log(likeToggle)
            socket.emit('like', { id: _id });

            setLikeToggle(!likeToggle);
            console.log(likeToggle)

            fetch('http://localhost:5000/likes', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    id: _id,
                    email: user.email,
                    isLiked: !likeToggle
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.modifiedCount > 0) {
                        fetch(`http://localhost:5000/post/${_id}`)
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                                setTotalLikes(data.likes);
                            })
                    }
                })
                .catch(err => console.log(err))
        }
    }
    const handleComment = (id) => {
        if (!user?.email) {
            setVisible(true);
        }
        else {
            navigate(`/comments/${id}`)
        }
    }
    return (
        <div className='border rounded mb-8'>
            <div className='flex p-4'>
                <div className='relative'>
                    <img src={pfp} alt="" className='absolute -z-10 top-0 w-12 h-12 rounded-full mr-4' />
                    <img src={profileImg} alt="" className=' z-50 w-12 h-12 rounded-full mr-4' />

                </div>
                <div className=' space-y-0'>
                    <h3 className='font-bold'>{displayName}</h3>
                    <small className=' text-xs opacity-50'>Student</small>
                </div>
            </div>
            <div>
                <div className='px-4 '>
                    <h2 className=' font-bold text-xl mb-2'>{title}</h2>
                    <p> {postContent}</p>
                </div>
                <img src={imageUrl} alt="" className='f w-full mt-4' />
            </div>
            <div className=' border-t-2 px-4 py-2 flex items-center space-x-4' >
                <div onClick={() => handleLike(_id)} className=' flex items-center space-x-2 hover:bg-slate-200 px-4 py-1 cursor-pointer'>
                    <FontAwesomeIcon size='lg' className={` cursor-pointer ${likeToggle && ' text-blue-600'} `} icon={faThumbsUp} />
                    <p>{totalLikes}</p>
                </div>
                <div onClick={() => handleComment(_id)} className=' flex items-center space-x-2 hover:bg-slate-200 px-2 py-1 cursor-pointer'>
                    <FontAwesomeIcon size='lg' icon={faComment} className={`cursor-pointer`} />
                    <p>100</p>
                </div>
            </div>
            <Modal
                show={visible}
                size="md"
                popup={true}
                onClose={() => setVisible(false)}
            >
                <Modal.Header />

                <Modal.Body>
                    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                        <h1>You need to login first to interect with posts. <Link to='/login'> <span className=' text-red-400 drop-shadow hover:text-red-700'>Login Here</span> </Link> </h1>

                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
