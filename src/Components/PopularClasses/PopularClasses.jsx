import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../Shared/ThemeContext/ThemeProvider';

const PopularClasses = () => {
    const [popularClasses, setPopularClasses] = useState([])
    const { theme } = useContext(ThemeContext);

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
  
    
    useEffect(() => {
        axios.get('https://art-crafters-server.vercel.app/classes/popular')
            .then(response => setPopularClasses(response.data))
            .catch(error => console.error('Error:', error));
    }, [])
    return (
        <div className='pt-20 ' style={themeStyles[theme]}>

            <div className='w-2/4 mb-10 mx-auto'>
                <hr  className='border-dotted border-2 border-indigo-600 '/>
                <h2 className='text-5xl text-center mb-3'>Popular Classes</h2>
                <hr className='border-dotted border-2 border-indigo-600 '/>
            </div>
            <div className='grid md:grid-cols-3 justify-items-center gap-y-6 md:w-[1220px] mx-auto'>
                {
                    popularClasses.map(classes => (
                        <div className="card card-compact w-96 bg-black text-white shadow-xl" key={classes._id}>
                            <figure>
                                <img className='h-64' src={classes.image} alt="" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{classes.name}</h2>
                                <p> Instructor:{classes.instructor}</p>
                                <p>Students:{classes.students}</p>

                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default PopularClasses;