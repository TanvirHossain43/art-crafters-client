import React, { useState } from 'react';
import { useQuery } from 'react-query';

const AllUsers = () => {
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('https://art-crafters-server.vercel.app/users');
        return res.json();
    });

    const handleRoleChange = async (event, userId) => {
        const newRole = event.target.value;

        try {
            const response = await fetch(`https://art-crafters-server.vercel.app/users/admin/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
            });

            if (response.ok) {
                console.log('Role updated');
                refetch(); 
            } else {
                console.log('Error updating role');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='w-full h-full pt-10 '>
            <h2 className='text-3xl text-center mb-6'>Manage Users</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead className='bg-black text-white text-xl'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? (
                                        'Admin'
                                    ) : user.role === 'instructor' ? (
                                        'Instructor'
                                    ) : (
                                        'Student'
                                    )}
                                </td>
                                <td>
                                    <select
                                        className="select select-bordered w-full mt-3"
                                        value={user.role} // Set the initial selected value based on user's current role
                                        onChange={(event) => handleRoleChange(event, user._id)}
                                    >
                                        <option disabled selected value="">
                                            Select role
                                        </option>
                                        <option value="admin">Admin</option>
                                        <option value="instructor">Instructor</option>
                                       
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
