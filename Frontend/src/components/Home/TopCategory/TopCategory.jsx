import catStyle from './TopCategory.module.css'
import  {getAllCategories}  from '../../../services/category.service';
import { useState ,useEffect } from 'react';
import{ useNavigate} from 'react-router-dom';
function TopCategory() {
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
        navigate('/category/'+id)
    }
    return ( 
        <div className="container-lg container-sm-fluid">
            <div className={`fs-3 ms-lg-5 ${catStyle.title}`}>
                Top Categoryies
            </div>
            <div className='d-flex flex-wrap ms-lg-5 mt-3 flex-grow justif-content-center'>
                {
                Categories.map((category,key)=>(
                    <div 
                    onClick={()=>(courseRelatedCategories(key))}
                    key={key} 
                    className={`${catStyle.cat_item}  flex-fill flex-shrink-0`}>
                        Personal Development
                    </div>
                ))}
                
            </div>
        </div>
    );
}

export default TopCategory;