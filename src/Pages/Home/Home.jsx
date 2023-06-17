import React from 'react';
import Banner from '../../Components/Banner/Banner';
import PopularClasses from '../../Components/PopularClasses/PopularClasses';
import PopularInstructors from '../../Components/PopularInstructors/PopularInstructors';
import ShowCase from '../../Components/ShowCase/ShowCase';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <ShowCase></ShowCase>
            
        </div>
    );
};

export default Home;