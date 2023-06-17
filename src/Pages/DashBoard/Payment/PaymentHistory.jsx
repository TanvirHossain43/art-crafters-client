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

            </ul>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>#</label>
                            </th>
                            <th>Class name</th>
                            <th>User Email</th>
                            <th>Transaction Id</th>
                            <th>Date & time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((payment, index) => (

                            <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <th> {payment.className}</th>
                                <td>{payment.email}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.date}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;