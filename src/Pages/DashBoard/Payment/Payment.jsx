import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutForm from './CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
import useClass from '../../../hooks/useClass';
import { useLocation, useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {

    const { price,name,id } = useParams();
   
    return (
        <div className='w-full'>
            <h2>Payment proceed</h2>
            <Elements stripe={stripePromise}>
                <CheckOutForm price={price} name={name} id={id}></CheckOutForm>
            </Elements>

        </div>
    );
};

export default Payment;