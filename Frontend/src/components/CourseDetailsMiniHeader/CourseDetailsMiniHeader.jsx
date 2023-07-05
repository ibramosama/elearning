import headerStyle from './CourseDetailsMiniHeader.module.css';
import CourseInstructor from './CourseInstructor/CourseInstructor';
import CourseSections from './CourseSections/CourseSections';
import CourseOverview from './CourseOverview/CourseOverview'
import React, { useState } from "react";

function CourseDetailsMiniHeader(props) {
    const [showOverview, setShowOverview] = useState(true);
    const [showCurriculum, setShowCurriculum] = useState(false);
    const [showInstructor, setShowInstructor] = useState(false);
    const handleOverview = ()=>{
        setShowOverview(true);
        setShowInstructor(false)
        setShowCurriculum(false);
    }
    const handleCurriculum = ( )=>{
        setShowOverview(false);
        setShowInstructor(false)
        setShowCurriculum(true);
    }
    const handleInstructor = () =>{
        setShowOverview(false);
        setShowInstructor(true)
        setShowCurriculum(false);
    }
    return ( 
        <div>
            <div className={`${headerStyle.mini_header} mt-3 rounded d-flex justify-content-center`}>
                <button 
                onClick={handleOverview}
                type="button" 
                className={`btn btn-light ms-3 me-3 ${headerStyle.mini_header_button}`}>Overview</button>
                <button 
                onClick={handleCurriculum}
                type="button" 
                className={`btn btn-light ms-3 me-3 ${headerStyle.mini_header_button}`}>Curriculum</button>
                <button 
                onClick={handleInstructor}
                type="button" 
                className={`btn btn-light ms-3 me-3 ${headerStyle.mini_header_button}`}>Instructor</button>
            </div>
            <div className='mt-4'>
                {showOverview   && <CourseOverview data= {props.data}></CourseOverview>}
                {showCurriculum && <CourseSections data= {props.data}></CourseSections>}
                {showInstructor && <CourseInstructor data= {props.data}></CourseInstructor>}
            </div>
        </div>
        
        
    );
}

export default CourseDetailsMiniHeader;