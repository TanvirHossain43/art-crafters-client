import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import { FcGoogle } from 'react-icons/fc';


const SocialLogin = () => {

    const { googleSignIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    const handleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                const saveUser = { name: loggedUser.displayName, email: loggedUser.email }

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true })
                    })
            })
            .catch(error => console.log(error))
    }
    return (
        <div className='w-full'>
            <div className='divider'></div>
            <div className=' text-center my-4 '>
                <button onClick={handleSignIn} className="btn btn-circle w-full ">
                    <FcGoogle  className='text-3xl'/> Login with Google
                </button>
            </div>

        </div>
    );
};

export default SocialLogin;