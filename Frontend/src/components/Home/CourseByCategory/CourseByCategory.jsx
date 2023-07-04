import { getCourseByCategory } from "../../../services/category.service";
import { useState ,useEffect } from 'react';
import { useParams } from "react-router-dom";
import CourseItem from "../CourseItem/CourseItem";
function CourseByCategory() {
    const [Courses,SetCourses] = useState([]) 
    var category_id =useParams()
    useEffect(() => {
        console.log(category_id.id)
        getCourseByCategory(category_id.id).then((courses) => {
            console.log(courses)
        }).catch((error) => {
            console.log(error)
        })
    },[])
    return ( 
        <div>
            
        </div>
    );
}

export default CourseByCategory;