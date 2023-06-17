import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import { useState } from 'react';
import login from '../../assets/Login.png'
import { FiEye, FiEyeOff } from 'react-icons/fi';


const Login = () => {
    const { signIn } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isIncorrectPassword, setIsIncorrectPassword] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";



    const onSubmit = (data) => {

        signIn(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
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
            })
            .catch(error => {
                console.log(error)
                setIsIncorrectPassword(true);
            })

    }
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    }

    return (
        <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2">
                    <img src={login} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body ">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" className="input input-bordered" name="email" {...register("email", { required: true })} />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    placeholder="password"
                                    className="input input-bordered pr-32"
                                    name="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })}
                                />  <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer w-8"
                                    onClick={togglePasswordVisibility}
                                >
                                    {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
                                </div>

                            </div>
                            {errors.password?.type === 'required' && <p role="alert" className="text-red-500">password is required</p>}
                            {errors.password?.type === 'minLength' && <p role="alert" className="text-red-500">password must be 6 characters</p>}
                            {errors.password?.type === 'pattern' && <p role="alert" className="text-red-500">password must have one capital letter, one special character, and at least one small letter</p>}
                            {isIncorrectPassword && <p role="alert" className="text-red-500">Incorrect password</p>}
                        </div>

                        <div className="form-control mt-6">

                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                        <h2>New to this Website? <Link to="/register"><span className='text-green-500'>Register</span></Link></h2>

                        <SocialLogin></SocialLogin>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default Login;