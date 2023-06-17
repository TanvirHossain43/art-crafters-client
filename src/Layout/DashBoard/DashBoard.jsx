import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const DashBoard = () => {

    // TODO : load data from the server to have dynamic isAdmin based on Data
    // const isAdmin = true;
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
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    {
                        isAdmin ? (
                            <>
                                <li><Link to="/dashboard/manageClasses">Manage Classes</Link></li>
                                <li><Link to="/dashboard/allusers">Manage Users</Link></li>
                            </>
                        ) : isInstructor ? (
                            <>
                                <li><Link to="/dashboard/addclass">Add a Class</Link></li>
                                <li><Link to="/dashboard/myclasses">My Classes</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/dashboard/myselectedclasses">My Selected Classes</Link></li>
                                <li><Link to="/">My Enrolled Classes</Link></li>
                                <li><Link to="/dashboard/paymentHistory">Payment History</Link></li>
                            </>
                        )
                    }





                    <div className='divider'></div>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/classes">Classes</Link></li>
                    <li><Link to="/instructors">Instructors</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default DashBoard;