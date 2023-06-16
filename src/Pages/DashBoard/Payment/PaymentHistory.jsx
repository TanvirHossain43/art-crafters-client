import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useSecureAxious from '../../../hooks/useSecureAxious';

const PaymentHistory = () => {
    const { user } = useAuth();
    const [axiosSecure] = useSecureAxious();
    const [paymentHistory, setPaymentHistory] = useState([]);
    useEffect(() => {
        if (user) {
            axiosSecure
                .get(`/payments/${user?.email}`)
                .then((res) => {
                    setPaymentHistory(res.data.payments);
                })
                .catch((error) => {
                    console.error('Error retrieving payment history:', error);
                });
        }
    }, [axiosSecure, user]);
    return (
        <div>
            <h2>Payment History</h2>
            <ul>
                {paymentHistory.map((payment) => (
                    <li key={payment._id}>
                        <p>Transaction ID: {payment.transactionId}</p>
                        <p>Price: {payment.price}</p>
                        <p>Class Name: {payment.className}</p>
                        <p>Date: {payment.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentHistory;