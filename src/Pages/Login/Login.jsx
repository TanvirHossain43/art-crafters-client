import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const Login = () => {
    const { signIn } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
            })

    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">

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
                            <input type="text" placeholder="password" className="input input-bordered" name="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })} />
                            {errors.password?.type === 'required' && <p role="alert" className="text-red-500">password is required</p>}
                            {errors.password?.type === 'minLength' && <p role="alert" className="text-red-500">password must be 6 character</p>}

                            {errors.password?.type === 'pattern' && <p role="alert" className="text-red-500">password must have one capital letter,one special character & atleast one small letter</p>}

                        </div>

                        <div className="form-control mt-6">

                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                        <h2>New to this Website? <Link to="/register"><span className='text-green-500'>Register</span></Link></h2>
                    </form>
                    
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;