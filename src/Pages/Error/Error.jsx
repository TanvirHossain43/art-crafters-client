import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='h-screen'>
        <div className='absolute w-full'>
            <img src="https://i.ibb.co/zfGwpHS/undraw-Page-not-found-re-e9o6.png" className='h-screen w-full' alt="" />
        </div>
        <div className='relative top-[50px] left-[50px] w-fit'>
            <button className='btn btn-outline bg-red-600'><Link to='/'>Back to Home</Link></button>
        </div>
        
    </div>
    );
};

export default Error;