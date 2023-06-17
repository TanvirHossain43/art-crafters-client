import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import Swal from 'sweetalert2';
import useClass from '../../hooks/useClass';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const SelectedClass = ({ classItem }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useClass();
    const { _id, price, image, name, instructor, availableSeats, students } = classItem;
    console.log(classItem)
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()

    const handleSelectClass = (id) => {
        if (!user) {
            alert('You have to log in first');
            return;
        }


        if (user && user?.email) {
            const addedClass = { selectClass: _id, name, image, price, email: user.email }
            // console.log(addedClass)

            fetch('http://localhost:5000/users/selectedClass', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(addedClass)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();// refetch cart to the number of added item
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Food added on the cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to add to the food',

                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }


    };
    return (
        <div className={`card card-side bg-base-100 shadow-xl w-[600px] ${classItem.availableSeats === 0 ? 'bg-red-500' : ''
            } `} >
            <figure className='w-2/5'>
                <img src={image} className='w-full h-full' alt='Movie' />
            </figure>
            <div className='card-body'>
                <h2 className='card-title'>{name}</h2>
                <p>Instructor: {instructor}</p>
                <p>Price: {price}</p>
                <p>Students: {students}</p>
                <p>Available Seats: {availableSeats}</p>
                <div className='card-actions justify-end'>
                    <button
                        onClick={() => handleSelectClass(_id)}
                        className='btn btn-primary'
                        disabled={!user || classItem.availableSeats === 0 || isAdmin || isInstructor}
                    >
                        Add class
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectedClass;