import React, { useEffect, useState } from 'react';
import useSecureAxious from '../../../hooks/useSecureAxious';
import useAuth from '../../../hooks/useAuth';

const MyEnroolClasses = () => {
    const { user } = useAuth();
    const [axiosSecure] = useSecureAxious();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axiosSecure.get('/payments', {
                    params: { email: user?.email },
                });
                setPayments(response.data.payments);
            } catch (error) {
                console.error('Error retrieving payment history:', error);
            }
        };

        if (user?.email) {
            fetchPayments();
        }
    }, [axiosSecure, user?.email]);

    // const {availableSeats,image,name,instructor,price,students,}
    return (
        <div className=' pt-10'>
            <h2 className='text-3xl text-center mb-6'>My Enrolled Classes</h2>
            <div>
                {payments.map((payment) => (

                    <div className={`card card-side bg-base-100 shadow-xl w-[600px] mb-4 `} >
                        <figure className='w-2/5'>
                            <img src={payment?.class?.image} className='w-full h-full' alt='image' />
                        </figure>
                        <div className='card-body'>
                            <h2 className='card-title'>{payment?.class?.name}</h2>

                            <p>Price: {payment?.class?.price}</p>
                            <p>Purchase Date: {payment.date}</p>
                            <div className='card-actions justify-end'>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEnroolClasses;
