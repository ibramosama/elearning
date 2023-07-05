import  {getAllCategories}  from '../../services/category.service';
import categoryStyle from './CourseCategory.module.css'
import { useState ,useEffect } from 'react';
import{NavLink ,useNavigate} from 'react-router-dom';
function CourseCategory() {
    let [Categories ,setCategories] =useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getAllCategories().then((cat)=>{
            if (cat != 404){
                setCategories(cat)
            }else{
                setCategories([])
            }
        })
    },[])

    const courseRelatedCategories=(id)=>{
        var course_id = parseInt(id)+1
        navigate(`/category/${course_id}`)
    }
    return ( 
        <div className={`${categoryStyle.course_category} mt-4 mb-4`}>
            <h4>Category</h4>
            <div className='fs-5 mt-3 lh-lg'>
                {
                    Categories.map((cat,key)=>(
                        
                        <div className={`${categoryStyle.categry_course}`} 
                        onClick={()=>(courseRelatedCategories(key))} 
                        key={key}>{cat.name}</div>
                        
                        
                    ))
                }
            </div>
        </div>
    );
}

export default CourseCategory;