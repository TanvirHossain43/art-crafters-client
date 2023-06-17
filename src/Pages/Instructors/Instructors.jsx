import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Instructors = () => {
    const [instructors, setInstructors] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/instructors')
            .then(response => setInstructors(response.data))
            .catch(error => console.error('Error:', error));
    }, [])
    return (
        <div className='pt-28 mb-20'>

          
            <div className='grid md:grid-cols-3 justify-items-center gap-y-6 md:w-[1220px] mx-auto'>
                {
                    instructors.map(instructor => (
                        <div className="card card-compact w-96 bg-base-100 shadow-xl" key={instructor._id}>
                            <figure>
                                <img className='h-64 w-full' src={instructor.image} alt="" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{instructor.name}</h2>
                                <p> Email:{instructor.email}</p>
                                

                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default Instructors;