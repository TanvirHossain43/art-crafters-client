import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react';
import CheckOutForm from './CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation, useParams } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {

    const { price,name,id } = useParams();
    return (
        <div className='w-full'>
            <h2 className='text-3xl text-center mb-6'>Payment proceed</h2>
            <Elements className="border-slate-800" stripe={stripePromise}>
                <CheckOutForm price={price} name={name} id={id}></CheckOutForm>
            </Elements>

        </div>
    );
};

export default Payment;