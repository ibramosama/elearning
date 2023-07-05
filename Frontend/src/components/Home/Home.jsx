
import { HomeBanner } from './../HomeBanner/HomeBanner';
// import { HomeNavbar } from '../HomeNavbar/HomeNavbar';

// import Nav from '../Navigation/Nav';

import TopCategory from './TopCategory/TopCategory';
import TopCourses from './TopCourses/TopCourses';
import { useEffect } from 'react';
function Home() {
    useEffect(() =>{
        // window.location.reload(true)
    },[])
    return ( 

        <div>
            
            <HomeBanner></HomeBanner>

            <TopCategory></TopCategory>
            <TopCourses></TopCourses>
            
            
        </div> 
    );
}

export default Home;