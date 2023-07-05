import courseStyle from './CourseDetails.module.css';
import CourseCategory from '../CourseCategory/CourseCategory';
import CourseDetailsMiniHeader from '../CourseDetailsMiniHeader/CourseDetailsMiniHeader';
import {useParams , useNavigate} from 'react-router-dom';
import { useState ,useEffect } from 'react';
import {getCourseDetails} from '../../services/course_details.service'
function CourseDetails() {
    const navigate = useNavigate()
    const [CourseData,setCourseData] =useState({});
    let [NumLectures,setNumlectures]= useState(0)
    var course_id =useParams()
    useEffect(() =>{
        getCourseDetails(course_id.id).then(course =>{
            if (course != 404){
                setNumlectures(number_lec(course));
                // console.log(count);
                setCourseData(course[0])
            }else{
                navigate('/notFound')
            }
        }).catch((error)=>{
            console.log(error)
        })
    },[]);
    
    const number_lec = (course)=>{
        try{
            var result=0;
            for(let i=0;i<course[0].sections.length;i++){
                result+=parseInt(course[0].sections[i].videos.length)
            }
            console.log(result)
            return result
        }catch(err){
            return 0
        }
        
    }

    return ( 
       <div className='container-lg  container-md-fluid '>
        
            <div className='row mt-5'>
                <div className='col-lg-7 ms-lg-4 me-lg-4 
                col-sm-12 col-md-8'>
                    <div className={`${courseStyle.title}`}>Mastering Data Modeling Fundamentals</div>

                    <div className={`${courseStyle.instructor } d-flex align-items-center`}>
                        <img className={`${courseStyle.instructor_img}`} src="https://htmldemo.net/edumall/edumall/assets/images/instructor/instructor-01.jpg"></img>
                        <div className={`${courseStyle.instructor_title}`}>Mahmoud Ramadan</div>
                        <span className={`${courseStyle.instructor_or}`}> | </span>
                        <div className={`${courseStyle.course_date}`}>Last Update December 1, 2020</div>
                    </div>
                    <div className='d-flex'>
                        <div className='me-4'>4.38 /5 </div>
                        <div className=''>
                            <i className="bi bi-star"> </i>
                            <i className="bi bi-star"> </i>
                            <i className="bi bi-star"> </i>
                            <i className="bi bi-star"> </i>
                            <i className="bi bi-star"> </i>
                        </div>
                    </div>
                   
                    <div className='mt-5 '>
                        
                        {/* <video width="100%" className='rounded' controls>
                            <source src={CourseData?.demo} type="video/mp4" controls="controls" controlsList="nofullscreen nodownload"/> 
                        </video> */}
                        {/* <video width="100%" className="rounded" controls>
                            <source src={()=>(CourseData?.demo)} type="video/mp4"/>
                        </video> */}

                        {CourseData?.demo && (
                            <video width="100%" className="rounded" controls >
                                <source src={CourseData.demo} type="video/mp4" />
                            </video>
                        )}

                        
                        
                    </div>
                    <CourseDetailsMiniHeader data={CourseData} />
                </div>
                <div className='col-lg-4 col-sm-12 col-md-4  me-lg-4 '>
                    <div className={`${courseStyle.course_details}`}>
                        <div className='d-flex align-items-center mb-3'>
                            <div className={`${courseStyle.real_price}`}>{CourseData?.price}<span className='fs-4'>.00</span> </div>
                            <div className={`${courseStyle.prve_price} ms-2 mt-2`}>{CourseData?.price * 2}$</div>
                        </div> 
                        <div className='d-flex justify-content-between'>
                            <div>
                                <i className={`${courseStyle.icon} bi bi-sliders2 me-4`}></i>
                                Level
                            </div>
                            <div className='opacity-75'>{CourseData?.level}</div>
                        </div>
                        <hr className={`${courseStyle.line_details}`}></hr>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <i className={`${courseStyle.icon} bi bi-clock me-4`}></i>
                                Duration
                            </div>
                            <div className='opacity-75'>{CourseData?.duration} hours</div>
                        </div>
                        <hr className={`${courseStyle.line_details}`}></hr>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <i className={`${courseStyle.icon} bi bi-play-circle-fill me-4`}></i>
                                Lecture
                            </div>
                            <div className='opacity-75'>{NumLectures} lectures</div>
                        </div>
                        <hr className={`${courseStyle.line_details}`}></hr>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <i className={`${courseStyle.icon} bi bi-tag-fill me-4`}></i>
                                Category
                            </div>
                            <div className='opacity-75'>{CourseData?.category}</div>
                        </div>

                        <div className='mt-5'>
                            <h4>Material Includes</h4>
                            <div className='fs-5'>
                                <i className={`${courseStyle.mat_include} bi bi-check2 ms-3 me-3`}></i>
                                <span>Videos</span>
                            </div>
                            <div className='fs-5'>
                                <i className={`${courseStyle.mat_include} bi bi-check2 ms-3 me-3`}></i>
                                <span>Quizes</span>
                            </div>
                        </div>
                        
                        <button type="button" className={`${courseStyle.btn_crt} btn btn-primary w-100 mt-5 p-3 fs-5 mb-2`}>Add To Cart</button>
                        <button type="button" className={`${courseStyle.btn_wish} btn btn-primary w-100 mt-1 p-3 fs-5 mb-2`}>Add To Wishlist</button>
                    </div>
                    <CourseCategory/>
                </div>
            </div>
       </div>
    );
}

export default CourseDetails;