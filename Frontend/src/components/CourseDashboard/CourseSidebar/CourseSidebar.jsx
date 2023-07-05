import sidebarStyle from './CourseSidebar.module.css';
import { Link } from "react-router-dom";
import React, { useRef ,useState,useEffect } from "react";
import DisplayVideo from './../DisplayVideo/DisplayVideo';
import {get_course_data} from '../../../services/course_display.service'


function CourseSidebar() {
    let [course_data,Set_course_data] =useState({})
    let [current_video,Set_current_video] =useState({})
    const mySidebar = useRef(null);
    const main = useRef(null);
    const openNav = () => {
        mySidebar.current.style.width = "350px";
        main.current.style.marginLeft = "350px";
    };

    const closeNav = () => {
        mySidebar.current.style.width = "0";
        main.current.style.marginLeft = "0";
    };
    useEffect(()=>{
        get_course_data(6).then((data)=>{
            Set_course_data(data)
            console.log(data)
        })

    },[])
    const HandleChangeVideo =(video)=>{
        Set_current_video(video)
    }
    return ( 
    <div>
        <div ref={mySidebar} className={`${sidebarStyle.sidebar} `}>
            <a href="#" className={`${sidebarStyle.closebtn}`} onClick={closeNav}>
                <i class="bi bi-x-circle"></i>
            </a>
            <div className={`${sidebarStyle.title}`}>
                Curriculum
            </div>
            {
                course_data?.sections?.map((section,key)=>(
                    <div className='me-4 ms-4' key={key}>
                        <button className={`${sidebarStyle.btn_section} mt-3 rounded`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${key}`} aria-expanded="false" aria-controls={`collapseExample${key}`}>
                            <div className='d-flex align-items-center'>
                                <i class="bi bi-caret-right-fill me-3 fs-3"></i> {section?.section}   
                            </div>
                        </button>
                        <hr className={`${sidebarStyle.line_section}`}></hr>
                        {section?.videos?.map((video)=>(
                            <div class={`collapse ${ key == 0 ? 'show' :'' }`} id={`collapseExample${key}`}>
                                <li class="list-group-item" onClick={() => HandleChangeVideo(video)} >
                                    <div className='d-flex align-items-center'>
                                    <i class="bi bi-play-circle me-3 fs-3"></i> 
                                        {video?.title}
                                    </div>          
                                </li>
                            </div>
                        ))}
                        
                    </div>

                    
                ))
            }
                        
        </div>

        <div ref={main} id={`${sidebarStyle.main}`}>
            <button className={`${sidebarStyle.openbtn}`} onClick={openNav}>
            ☰ 
            </button>
            <DisplayVideo video={current_video}></DisplayVideo>
        </div>
    </div>
    );
}

export default CourseSidebar;