import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Providers/AuthProviders';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import signup from '../../assets/signup.png';

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const navigate = useNavigate();
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const onSubmit = data => {
        if (data.password !== data.confirmPassword) {
            return;
        }

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email };
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(error => console.log(error));
            });
    }

    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="w-1/2 h-fit">
                    <img src={signup} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full h-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" name="name" {...register("name", { required: true })} className="input input-bordered" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" placeholder="Photo URL" {...register("photoURL", { required: true })} className="input input-bordered" />
                            {errors.photoURL && <span className="text-red-600">photo URL required</span>}
                        </div>
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
                            <input type="password" placeholder="password" className="input input-bordered" name="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })} />
                            {errors.password?.type === 'required' && <p role="alert" className="text-red-500">password is required</p>}
                            {errors.password?.type === 'minLength' && <p role="alert" className="text-red-500">password must be 6 characters</p>}
                            {errors.password?.type === 'pattern' && <p role="alert" className="text-red-500">password must have one capital letter, one special character & at least one small letter</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                required
                                type="password"
                                placeholder="confirm password"
                                className="input input-bordered"
                                name="confirmPassword"
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: value => value === password || "Passwords do not match"
                                })}
                            />
                            {errors.confirmPassword && <p role="alert" className="text-red-500">{errors.confirmPassword.message}</p>}
                            {errors.password?.type === 'required' && <p role="alert" className="text-red-500">confirm password is required</p>}
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="SignUp" />
                        </div>
                        <h2>Already have an account? <Link to="/login"><span className='text-green-500'>Login</span></Link></h2>
                        <SocialLogin></SocialLogin>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
