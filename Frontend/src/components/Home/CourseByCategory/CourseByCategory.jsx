import { getCourseByCategory } from "../../../services/category.service";
import { useState ,useEffect } from 'react';
import { useParams,useNavigate } from "react-router-dom";
import CourseItem from "../CourseItem/CourseItem";
function CourseByCategory() {
    const [Courses,SetCourses] = useState([]) 
    var category_id =useParams()
    const navigate =useNavigate()
    useEffect(() => {
        console.log(category_id.id)
        getCourseByCategory(category_id.id).then((courses) => {
            if(courses!=404){
                SetCourses(courses)

            }else{
                navigate('/notFound')
            }
        }).catch((error) => {
            console.log(error)
        })
    },[])
    const handleDetailsCourse=(id)=>{
        console.log(id)
        let course_id =parseInt(id)+1;
        navigate(`/course_details/${course_id}`)
    }
    return ( 
        <div className=" container-lg container-sm-fluid ">
            <div className={`fs-3 ms-lg-5 `}>
                All Course in the <span className="ms-2">
                    {
                    Courses[0]?.category
                    }
                </span>
                
            </div>
            <div className="d-flex ms-lg-5 flex-wrap">
                {
                    Courses.map((course,key) =>(
                        <div key={key} 
                        onClick={()=>(handleDetailsCourse(key))} >
                            <CourseItem key={key} course={course} ></CourseItem>

                        </div>
                    ))
                }
            </div>
            
        </div>
    );
}

export default CourseByCategory;