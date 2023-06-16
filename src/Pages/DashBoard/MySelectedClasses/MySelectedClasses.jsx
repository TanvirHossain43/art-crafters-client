import React from 'react';
import useClass from '../../../hooks/useClass';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MySelectedClasses = () => {
    const [selectedClass, refetch] = useClass()
    // how does reduce work
    const total = selectedClass.reduce((sum, item) => item.price + sum, 0)
    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/selectedClass/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted',
                                'success'
                            )
                        }
                    })
            }
        })

    }
    return (
        <div className='w-full'>
            <div className='uppercase font-semibold h-[60px] flex justify-evenly items-center '>
                <h3 className='text-3xl'>Total items:{selectedClass.length}</h3>
                <h2 className='text-3xl'>Total price:${total.toFixed(2)}</h2>
                {/* <button className='btn btn-warning btn-sm'> <Link to="/dashboard/payment">Pay</Link></button> */}
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>Food</th>
                            <th>Item name</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedClass.map((item, index) =>
                            <tr key={item._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar " />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>

                                <td className='text-start'>${item.price}</td>
                                <td className=' btn btn-warning btn-lg mx-auto '><Link to={`/dashboard/payment/${item.price}/${item.name}/${item._id}`}> Pay</Link></td>

                                <th>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost btn-lg bg-red-600">D</button>
                                </th>
                            </tr>

                        )}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySelectedClasses;