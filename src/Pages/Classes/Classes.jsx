import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectedClass from '../../Components/SelectedClass/SelectedClass';

const Classes = () => {
    
    const [classes, setClasses] = useState([]);
    

    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then((res) => res.json())
            .then((data) => {
                setClasses(data);
            });
    }, []);

    

    return (
        <div className='pt-24 mb-10'>
            <div className='grid md:grid-cols-2 w-full justify-items-center gap-y-6'>
            {classes.map((classItem) => <SelectedClass key={classItem._id} classItem={classItem}></SelectedClass>)}

            </div>
        </div>
    );
};

export default Classes;
