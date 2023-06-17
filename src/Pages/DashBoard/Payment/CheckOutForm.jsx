import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useSecureAxious from '../../../hooks/useSecureAxious';
import useAuth from '../../../hooks/useAuth';
import './Payment.css'
import useClass from '../../../hooks/useClass';
import Swal from 'sweetalert2';


const CheckOutForm = ({ price, name, id }) => {
    const stripe = useStripe()
    const elements = useElements()
    const { user } = useAuth()
    const [axiosSecure] = useSecureAxious()
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')




    useEffect(() => {
        axiosSecure
            .post('/create-payment-intent', { price })
            .then((res) => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
            .catch((error) => {
                console.error('Error creating payment intent:', error);
            });
    }, [axiosSecure, price]);


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }
        console.log(card)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('error', error)
            setCardError(error.message)
        }
        else {
            setCardError('')
            console.log('paymentmethod', paymentMethod)
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous',
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError)
        }
        setProcessing(false)
        console.log(paymentIntent)

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id)
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                className: name,
                date: new Date(),
                classId: id,


            };
            console.log(payment)

            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedClass.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Payment successful',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        axiosSecure
                            .patch(`/classes/${id}`, { incrementStudents: true })
                            .then((patchRes) => {
                                console.log(patchRes.data);
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Payment successful',
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                            })
                            .catch((patchError) => {
                                console.error('Error updating available seats:', patchError);
                                
                            });

                    }
                })

        }
    }
    return (
        <>
            <form className='w-2/3 mx-auto' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary mt-5 btn-sm' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {cardError && <p className='text-red-600'>{cardError}</p>}
            {transactionId && <p className='text-green-600'>Transaction is completed with transactionId:{transactionId}</p>}
        </>
    );
};

export default CheckOutForm;