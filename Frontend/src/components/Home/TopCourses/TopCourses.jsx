import courseStyle from './TopCourses.module.css'
import CourseItem from '../CourseItem/CourseItem';
import { getCourses } from '../../../services/course_list.service';
import {useParams , useNavigate} from 'react-router-dom';
import { useState ,useEffect } from 'react';
function TopCourses() {
    let [Courses,setCourses] =useState([])
    useEffect(() => {
        getCourses().then(courses => {
            console.log(courses);
            setCourses(courses);
        })
    },[])
    return ( 
        <div className="container-lg container-sm-fluid">
            <div className={`${courseStyle.title} mt-5 ms-lg-5 fs-3`}> Top Courses </div>
            <div className='d-flex ms-lg-5 mt-3 flex-wrap justify-content-center'>
                {
                    Courses.map((course , key)=>(
                        <CourseItem key={key} course={course}></CourseItem>
                    ))
                }
            </div>
            
            
        </div>
        
     );
}

export default TopCourses;