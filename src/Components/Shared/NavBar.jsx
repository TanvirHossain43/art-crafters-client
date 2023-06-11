import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [activeLink, setActiveLink] = useState('')
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (link) => {
        setActiveLink(link)
    }

    const options = <>

        <li className='text-lg font-semibold'>
            <Link to="/" onClick={() => handleClick('/')} className={` ${activeLink === '/' ? 'text-blue-800 text-xl ' : ''
                }`}>
                Home
            </Link>
        </li>
        {/* 
        <li className='text-lg font-semibold ml-2'>
            <Link to="/addtask" className={` ${activeLink === 'addtask' ? 'text-blue-800 text-xl ' : ''
                }`}
                onClick={() => handleClick('addtask')}>
                Add Task</Link>
        </li> */}

    </>


    return (

        <div className="navbar bg-opacity-40 bg-black text-white max-w-screen-xl rounded-lg mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    {isOpen && (
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 bg-black">
                            {options}
                        </ul>
                    )}
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-3xl font-bold text-orange-700">Art Crafters</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {options}
                </ul>
            </div>
            <div className="avatar navbar-end">

            </div>
        </div>

    );
};

export default NavBar;