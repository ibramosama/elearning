import Sidebar from "../Courses/Sidebar/Sidebar";
import { useEffect,useState } from "react";
import {getCourses} from "../../services/course_list.service";
import CourseItem from "../Home/CourseItem/CourseItem";
import side from './Courses.module.css';
function Courses() {
    var [Courses ,setCourses] = useState([]);
    useEffect(() => {
        getCourses()
        .then(courses => {
            console.log(courses)

            setCourses(courses);
        })
        .catch(err => {
            console.log(err);
        })
    },[])
    return ( 
        <div>
            
            <div className={`d-flex flex-wrap container`}>
                { Courses && Courses.map((courses,key )=>(
                    <CourseItem key={key} course={courses}></CourseItem>
                ))}
            </div>
            
            
        </div>
    );
}

export default Courses;