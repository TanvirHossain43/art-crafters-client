import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';

const MyEnroolClasses = () => {
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/payments/${user?.email}`);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [user]);

    return (
        <div className='w-full h-full pt-10'>
           <h2 className='text-3xl text-center'>Enrolled Classes</h2>
        </div>
    );
};

export default MyEnroolClasses;
