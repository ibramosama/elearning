import courseStyle from './TopCourses.module.css'
import CourseItem from '../CourseItem/CourseItem';
import { getCourses } from '../../../services/course_list.service';
import {useParams , useNavigate} from 'react-router-dom';
import { useState ,useEffect } from 'react';
function TopCourses() {
    let [Courses,setCourses] =useState([])
    const navigate =useNavigate()
    useEffect(() => {
<<<<<<< HEAD
        getCourses().then(response => {
            console.log(response);
            const courses = response.data; // Assuming the courses array is inside the 'data' property
            setCourses(courses);
          });
          
          
=======
        getCourses().then(courses => {
            console.log(courses);
            
                setCourses(courses);
            
        })
>>>>>>> 6951b16d5003d2e50d1be31e6508706d5575968f
    },[])
    const handleDetailsCourse=(id)=>{
        console.log(id)
        let course_id =parseInt(id)+1;
        navigate(`/course_details/${course_id}`)

    }
    return ( 
        <div className="container-lg container-sm-fluid">
            <div className={`${courseStyle.title} mt-5 ms-lg-4 fs-3`}> Top Courses </div>
            <div className='d-flex ms-lg-4 mt-3 flex-wrap '>
                {
                    Courses && Courses.map((course,key)=>(
                        <div key={key} onClick={()=>(handleDetailsCourse(key))} className=' flex-shrink-1' >
                            <CourseItem key={key} course={course} ></CourseItem>

                        </div>
                    ))
                }
            </div>
            
            
        </div>
        
     );
}

export default TopCourses;