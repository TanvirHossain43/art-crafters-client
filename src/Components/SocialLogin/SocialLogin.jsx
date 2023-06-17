import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';


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

                Swal.fire({
                    title: 'User login successful',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true })

                fetch('https://art-crafters-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })

                    .then(res => res.json())
                    .then(() => {
                    })
            })
            .catch(error => console.log(error))
    }
    return (
        <div className='w-full'>
            <div className='divider'></div>
            <div className=' text-center my-4 '>
                <button onClick={handleSignIn} className="btn btn-circle w-full ">
                    <FcGoogle className='text-3xl' /> Login with Google
                </button>
            </div>

        </div>
    );
};

export default SocialLogin;