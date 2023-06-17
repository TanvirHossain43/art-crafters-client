import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import { ThemeContext } from './ThemeContext/ThemeProvider';

const NavBar = () => {
    const [activeLink, setActiveLink] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext)
    const { theme, toggleTheme } = useContext(ThemeContext);

  const themeStyles = {
    dark: {
      backgroundColor: 'black',
      color: 'white',
    },
    light: {
      backgroundColor: 'white',
      color: 'black',
    },
  };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (link) => {
        setActiveLink(link)
    }

    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error)
            })
    }

    const options = <>

        <li className='text-lg font-semibold'>
            <Link to="/" onClick={() => handleClick('/')} className={` ${activeLink === '/' ? 'text-blue-800 text-xl ' : ''
                }`}>
                Home
            </Link>
        </li>
        
        <li className='text-lg font-semibold ml-2'>
            <Link to="/instructors" className={` ${activeLink === 'instructors' ? 'text-blue-800 text-xl ' : ''
                }`}
                onClick={() => handleClick('instructors')}>
                Instructors</Link>
        </li>
        <li className='text-lg font-semibold ml-2'>
            <Link to="/classes" className={` ${activeLink === 'classes' ? 'text-blue-800 text-xl ' : ''
                }`}
                onClick={() => handleClick('classes')}>
                Classes</Link>
        </li>
     {
        user? <>
          <li className='text-lg font-semibold ml-2'>
        <Link to="/dashboard" className={` ${activeLink === 'dashboard' ? 'text-blue-800 text-xl ' : ''
            }`}
            onClick={() => handleClick('dashboard')}>
            DashBoard</Link>
            </li>
        </>:<></>
    
     }

    </>


    return (

        <div className="navbar bg-opacity-40 bg-black text-white  rounded-lg mx-auto fixed z-10 " style={themeStyles[theme]}>
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
            <div className=" navbar-end">
                {
                    user ?
                        <div className='flex items-center gap-x-3'>
                            <div>
                            <button className='btn btn-outline mr-2' onClick={toggleTheme}>Toggle Theme</button>
                                <button onClick={handleLogOut} className='btn btn-primary'>LogOut</button>
                            </div>
                            <div className="w-16">
                                <img className='w-14 rounded-full' src={user?.photoURL} title={user?.displayName} />
                            </div>
                        </div>
                        :
                        <Link to="/login">
                            <button className='btn btn-primary'>Login</button>
                        </Link>


                }



            </div>
        </div>

    );
};

export default NavBar;