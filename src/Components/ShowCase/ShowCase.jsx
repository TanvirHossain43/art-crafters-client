import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../Shared/ThemeContext/ThemeProvider';

const ShowCase = () => {
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
    return (
        <div style={themeStyles[theme]}>
            <div className='w-2/4 mb-10 mx-auto'>
                <hr className='border-dotted border-2 border-indigo-600 ' />
                <h2 className='text-5xl text-center mb-3'>Art & Craft Showcase</h2>
                <hr className='border-dotted border-2 border-indigo-600 ' />
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 w-2/3 mb-10 mx-auto">
                <div class="grid gap-6">
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://i.ibb.co/jyfWzVh/L-1.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://i.ibb.co/hRh3bBB/s-2.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://i.ibb.co/86vm9Dz/s-6.webp" alt="" />
                    </div>
                </div>
                <div class="grid gap-2">
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://i.ibb.co/pLyVYH3/s-3.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://i.ibb.co/QjSJLYC/l-3.webp" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://i.ibb.co/fQ95Vtc/s-4.jpg" alt="" />
                    </div>
                </div>
                <div class="grid gap-6">
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://i.ibb.co/G7PFDf6/s-5.webp" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://i.ibb.co/cTDDYcs/s-3.webp" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://i.ibb.co/q1z9d3r/s-7.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src=" https://i.ibb.co/b1g2dvs/s-8.jpg" alt="" />
                    </div>


                </div>


            </div>


        </div>
    );
};

export default ShowCase;