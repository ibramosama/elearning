import overviewStyle from './CourseOverview.module.css';
function CourseOverview(props) {
    return ( 
        <div>
            <h4>About This Course</h4>
            <p className="text-justify">
                {props.data?.description}
            </p>
            <div className={`${overviewStyle.learning_obj}`}>
                <h4 className='ms-4'>
                Learning Objectives
                </h4>
                <div className='ms-4 d-flex flex-wrap'>
                    <div className='w-50 d-flex mt-4 mb-3'>
                        <i className={`${overviewStyle.lerning_obj_icon} bi bi-check-circle me-3`}></i>
                        <div>
                            Ready to begin working on real-world data modeling projects,
                        </div>
                    </div>
                    <div className='w-50 d-flex mt-4 mb-3'>
                        <i className={`${overviewStyle.lerning_obj_icon} bi bi-check-circle me-3`}></i>
                        <div>
                            Ready to begin working on real-world data modeling projects,
                        </div>
                    </div>
                    <div className='w-50 d-flex'>
                        <i className={`${overviewStyle.lerning_obj_icon} bi bi-check-circle me-3`}></i>
                        <div>
                            Ready to begin working on real-world data modeling projects,
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
     );
}

export default CourseOverview;