import React from 'react';
import AutoplaySlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';



const Banner = () => {
  
    return (
        <AutoplaySlider
            className="opacity-40 h-screen"
            play={true}
            cancelOnInteraction={false}
            interval={3000}
            bullets={false}
            

        >
            <div data-src="https://i.ibb.co/Pgx7vcF/2.jpg" className='absolute' >
                <div className="text-container bg-transparent text-white p-4 relative">
                    <h2 className="title text-5xl font-bold text-slate-900 text-center">Painting Masterclass</h2>
                    <p className="description text-3xl text-emerald-900">Learn the art of painting from experts and unleash your creativity.</p>
                </div>
            </div>

            <div data-src="https://i.ibb.co/wy9NgDw/1.jpg" className='absolute'>
                <div className="text-container bg-transparent text-white p-4 relative">
                    <h2 className="title text-5xl font-bold text-blue-400 text-center">DIY Craft Workshops</h2>
                    <p className="description text-3xl text-slate-600">Join our interactive DIY craft workshops and create beautiful handmade items.</p>
                </div>
            </div>

            <div data-src="https://i.ibb.co/5RbQ25Z/3.jpg" className='absolute' >
                <div className="text-container bg-transparent text-white p-4 relative">
                    <h2 className="title text-5xl font-bold text-gray-100 text-center">Art Exhibition</h2>
                    <p className="description text-3xl text-yellow-300">Explore our art exhibition showcasing stunning artworks by talented artists.</p>
                </div>

            </div>

        </AutoplaySlider>
    );
};

export default Banner;