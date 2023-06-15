import React, { useState } from 'react';
import { useQuery } from 'react-query';

const AllUsers = () => {
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users');
        return res.json();
    });

    const handleRoleChange = async (event, userId) => {
        const newRole = event.target.value;

        try {
            const response = await fetch(`http://localhost:5000/users/admin/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
            });

            if (response.ok) {
                console.log('Role updated');
                refetch(); // Refresh the user data after updating the role
            } else {
                console.log('Error updating role');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
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
                                        <option disabled value="">
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
