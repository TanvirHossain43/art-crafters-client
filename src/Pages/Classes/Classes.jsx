import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectedClass from '../../Components/SelectedClass/SelectedClass';

const Classes = () => {

    const [classes, setClasses] = useState([]);


    useEffect(() => {
        fetch('https://art-crafters-server.vercel.app/classes')
            .then((res) => res.json())
            .then((data) => {
                setClasses(data);
            });
    }, []);



    return (
        <div className='pt-28 mb-10'>
            <div className='grid md:grid-cols-2 w-full justify-items-center gap-y-6'>
                {classes.map((classItem) => {
                    if (classItem.status === 'approved') {
                        return <SelectedClass key={classItem._id} classItem={classItem} />;
                    }
                    return null;
                })}

            </div>
        </div>
    );
};

export default Classes;
