import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import Swal from 'sweetalert2';
import { QueryClient, useQueryClient } from 'react-query';

const Classes = () => {
    const { user } = useContext(AuthContext)
    const [classes, setClasses] = useState([])
    const queryClient = useQueryClient();
    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => {
                setClasses(data)
            })
    }, [])

    const handleSelectClass = (id) => {
        if (!user) {
            alert('You have to log in first');
            return;
        }

        else {
            const proceed = confirm('Are you sure to add the class');
            if (proceed) {
                fetch(`http://localhost:5000/classes/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ incrementStudents: true }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.modifiedCount > 0) {
                            Swal.fire('Data updated successfully!', 'Good Job!', 'success')
                            // Find the class by ID in the current classes state
                            const updatedClasses = classes.map((classItem) => {
                                if (classItem._id === id) {
                                    // Update availableSeats and students properties
                                    return {
                                        ...classItem,
                                        availableSeats: classItem.availableSeats - 1,
                                        students: classItem.students + 1,
                                    };
                                }
                                return classItem;
                            });

                            // Update the classes state with the modified class data
                            setClasses(updatedClasses);
                        } else {
                            alert('Nothing has changed');
                        }
                    })
                    .catch((error) => {
                        console.error('Error updating class:', error);
                        alert('Failed to update class');
                    });
            }
        }
    };


    return (
        <div className='pt-20 mb-10'>

            <div className='grid md:grid-cols-2 w-full justify-items-center gap-y-6'>
                {
                    classes.map((classItem) => (
                        <div className="card card-side bg-base-100 shadow-xl w-[600px]" key={classItem._id}>
                            <figure className='w-2/5 '>
                                <img src={classItem.image} className='w-full h-full' alt="Movie" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{classItem.name}</h2>
                                <p>Instructor:{classItem.instructor}</p>
                                <p>Instructor:{classItem.price}</p>
                                <p>Students:{classItem.students}</p>
                                <p>Available Seats:{classItem.availableSeats}</p>
                                <div className="card-actions justify-end">
                                    <button onClick={() => handleSelectClass(classItem._id)} className="btn btn-primary">Add class</button>
                                </div>
                            </div>
                        </div>

                    ))}
            </div>
        </div>








    );
};

export default Classes;