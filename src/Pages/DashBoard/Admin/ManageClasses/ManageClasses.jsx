import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import useClass from '../../../../hooks/useClass';
import { useQuery } from 'react-query';

const ManageClasses = () => {
    const { data: classes, refetch } = useQuery('classes', () =>
        axios.get('http://localhost:5000/classes').then((response) => response.data)
    );

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:5000/classes')
    //         .then((response) => {
    //             setClasses(response.data);

    //         })
    //         .catch((error) => {
    //             console.error('Error fetching classes:', error);
    //         });
    // }, []);


    const handleClassUpdate = async (id, status) => {
        console.log(id)
        try {
            const response = await fetch(`http://localhost:5000/classes/${id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                console.log('Class updated successfully');
                refetch()
            } else {
                console.log('Error updating class');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Manage Classes</h1>
            <div className="">
                {classes?.map((classItem) => (
                    <div className={`card card-side bg-base-100 shadow-xl w-[700px] mb-3`} >
                        <figure className='w-2/5'>
                            <img src={classItem.image} className='w-full h-full' alt='Movie' />
                        </figure>
                        <div className='card-body'>
                            <h2 className='card-title'>{classItem.name}</h2>
                            <p>Instructor: {classItem.instructor}</p>
                            <p>Price: {classItem.price}$</p>
                            <p>Students: {classItem.students}</p>
                            <p>Available Seats: {classItem.availableSeats}</p>
                            <p>Status: {classItem.status}</p>
                            <div className='card-actions justify-end'>
                                <button className='btn btn-success' onClick={() => handleClassUpdate(classItem._id, 'approved')} disabled={classItem.status !== 'pending'}>
                                    Approve
                                </button>
                                <button className='btn btn-warning' onClick={() => handleClassUpdate(classItem._id, 'denied')} disabled={classItem.status !== 'pending'}>
                                    Deny
                                </button>
                                <button className='btn btn-primary' >Send Feedback</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageClasses;