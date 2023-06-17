import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';
import { GrUserManager } from "react-icons/gr";
import { MdManageAccounts, MdFlightClass } from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import { AiOutlineCloudDownload, AiOutlineWallet, AiTwotoneHome } from "react-icons/ai";
import { BiSelectMultiple } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";


const DashBoard = () => {

    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 ml-10 mr-2 pt-20 h-full bg-emerald-400 text-white text-xl ">
                    {/* Sidebar content here */}
                    {
                        isAdmin ? (
                            <>
                                <li><Link to="/dashboard/manageClasses"><MdManageAccounts />Manage Classes</Link></li>
                                <li><Link to="/dashboard/allusers">
                                    <GrUserManager />Manage Users</Link></li>
                            </>
                        ) : isInstructor ? (
                            <>
                                <li><Link to="/dashboard/addclass"><SiAddthis />Add a Class</Link></li>
                                <li><Link to="/dashboard/myclasses"><AiOutlineCloudDownload />My Classes</Link></li>
                            </>
                        ) : (
                            <>
                                <li ><Link to="/dashboard/myselectedclasses"><BiSelectMultiple />My Selected Classes</Link></li>

                                <li><Link to="/dashboard/paymentHistory"><FaHistory />Payment History</Link></li>

                                <li><Link to="/dashboard/enroolClasses"><AiOutlineWallet />My Enrolled Classes</Link></li>
                            </>
                        )
                    }





                    <div className='divider'></div>
                    <li><Link to="/"><AiTwotoneHome />Home</Link></li>
                    <li><Link to="/classes"><MdFlightClass />Classes</Link></li>
                    <li><Link to="/instructors"><GrUserManager className='text-white' />Instructors</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default DashBoard;