import overviewStyle from './CourseOverview.module.css';
function CourseOverview() {
    return ( 
        <div>
            <h4>About This Course</h4>
            <p className="text-justify">
            In this course, I take you from the fundamentals and concepts
             of data modeling all the way through a number of best practices
              and techniques that you’ll need to build data models in your 
              organization. You’ll find many examples that clearly demonstrate
               the key concepts and techniques covered throughout the course.
                <br></br>
                <br></br>
               By the end of the course, you’ll be all set to not only put 
               these principles to work, but also to make the key data 
               modeling and design decisions required by the “art” of 
               data modeling that transcend the nuts-and-bolts techniques 
               and design patterns.
               <br></br>
               <br></br>
               
               Organisations, or groups of organisations, may establish
                the need for master data management when they hold more 
                than one copy of data about a business entity. Holding more 
                than one copy of this master data inherently means that
                there is an inefficiency in maintaining a “single version
                of the truth” across all copies. Unless people, processes
                and technology are in place to ensure that the data values are kept aligned across all copies, it is almost inevitable that different versions of information about a business entity will be held.
            </p>
            <div className={`${overviewStyle.learning_obj}`}>
                <h4 className='ms-4'>
                Learning Objectives
                </h4>
                <div className='ms-4 d-flex flex-wrap'>
                    <div className='w-50 d-flex mt-4 mb-3'>
                        <i class={`${overviewStyle.lerning_obj_icon} bi bi-check-circle me-3`}></i>
                        <div>
                            Ready to begin working on real-world data modeling projects,
                        </div>
                    </div>
                    <div className='w-50 d-flex mt-4 mb-3'>
                        <i class={`${overviewStyle.lerning_obj_icon} bi bi-check-circle me-3`}></i>
                        <div>
                            Ready to begin working on real-world data modeling projects,
                        </div>
                    </div>
                    <div className='w-50 d-flex'>
                        <i class={`${overviewStyle.lerning_obj_icon} bi bi-check-circle me-3`}></i>
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