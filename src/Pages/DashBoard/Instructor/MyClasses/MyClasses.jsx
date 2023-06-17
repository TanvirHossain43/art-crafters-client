import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../Providers/AuthProviders';

const MyClasses = () => {
    const [classes, setClasses] = useState([])
    const { user } = useContext(AuthContext)
    useEffect(() => {
        fetch(`https://art-crafters-server.vercel.app/classes?instructorEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])
    return (
        <div className='w-full h-full pt-10 '>
            <h3 className='text-3xl mb-4 text-center'>Your all Added Class is here:{classes.length}</h3>
            <div className='grid md:grid-cols-1 w-full justify-items-center gap-y-6'>

                {
                    classes.map((classItem) =>
                        <div className={`card card-side  shadow-xl w-[700px] bg-gray-400 text-white`} >
                            <figure className='w-2/5'>
                                <img src={classItem.image} className='w-full h-full' alt='Movie' />
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title text-2xl'>{classItem.name}</h2>
                                <p>Instructor: {classItem.instructor}</p>
                                <p>Price: {classItem.price}$</p>
                                <p>Students: {classItem.students}</p>
                                <p>Available Seats: {classItem.availableSeats}</p>
                                <p>Status: {classItem?.status}</p>
                                {classItem.status === 'pending' ? '' : <p>Feedback: {classItem?.feedback}</p>}
                                <div className='card-actions justify-end'>
                                    <button className='btn btn-primary'>Update Class</button>
                                </div>
                            </div>
                        </div>)}
            </div>
        </div>

    );
};

export default MyClasses;