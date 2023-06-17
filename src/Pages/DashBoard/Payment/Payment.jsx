import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react';
import CheckOutForm from './CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
import { useLoaderData, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {

    const selectedClass =useLoaderData()
    console.log(selectedClass)
    
    return (
        <div className='w-full'>
            <h2 className='text-3xl text-center mb-6'>Payment proceed</h2>
            <Elements className="border-slate-800" stripe={stripePromise}>
                <CheckOutForm selectedClass={selectedClass}></CheckOutForm>
            </Elements>

        </div>
    );
};

export default Payment;