import React, { useContext } from 'react';
import { AuthContext } from '../../../../Providers/AuthProviders';
import Swal from 'sweetalert2';

const AddClass = () => {
    const {user}= useContext(AuthContext)

    const handleAddClass = (event) => {
        event.preventDefault();
        const form = event.target;
        const className = form.name.value;
        const image = form.image.value;
       ;
        const instructorName = form.instructor.value;
        const instructorEmail= form.instructorEmail.value;
        const availableSeats =form.availableSeats.value;
        const price =form.price.value;
        const newClass = {
           name:className,
            image:image,
            status : 'pending',
            instructor:instructorName,
            instructorEmail:instructorEmail,
            availableSeats:availableSeats,
            price:price,
            students:0
        }
        console.log(newClass)
        fetch('http://localhost:5000/classes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newClass)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire(
                        'Class added successfully!',
                        'Wait for admin approve!',
                        'success'
                    )

                }
            })


    }
    return (
        <form onSubmit={handleAddClass} className="form-control w-full lg:w-1/2 md:w-1/2 mx-auto mt-10 bg-gray-400 p-6 rounded-xl h-screen">

        <label className="label">
            <span className="label-text text-lg font-semibold">Class name</span>
        </label>
        <input type="text" placeholder="Enter Class Name" className="input input-bordered w-full " name='name' required />

        <label className="label">
            <span className="label-text text-lg font-semibold">Class Image</span>
        </label>
        <input type="text" placeholder="Enter Image link" className="input input-bordered w-full " name='image' required />

        <label className="label">
            <span className="label-text text-lg font-semibold">Instructor name</span>
        </label>
        <input type="text" placeholder="Enter Instructor Name" className="input input-bordered w-full " name='instructor'  value={user?.displayName} required />
        <label className="label">
            <span className="label-text text-lg font-semibold">Instructor Email</span>
        </label>
        <input type="text" placeholder="Enter Instructor Email" className="input input-bordered w-full " name='instructorEmail'  value={user?.email} required />
        <label className="label">
            <span className="label-text text-lg font-semibold">Available Seats</span>
        </label>
        <input type="text" placeholder="Enter Available Seats" className="input input-bordered w-full " name='availableSeats'  required />
        <label className="label">
            <span className="label-text text-lg font-semibold">Price</span>
        </label>
        <input type="text" placeholder="Enter Price" className="input input-bordered w-full " name='price'  required />

        

        <select className="select select-bordered w-full  mt-3"
        >
            <option disabled selected required value="">Select status</option>
            <option value="pending">pending</option>
        </select>

        <div className=' mt-3'>
            <button className='btn btn-primary w-full '>Add Task</button>
        </div>

    </form>
    );
};

export default AddClass;