
import categoryStyle from './CourseCategory.module.css'
function CourseCategory() {
    return ( 
        <div className={`${categoryStyle.course_category} mt-4 mb-4`}>
            <h4>Category</h4>
            <div className='fs-5 mt-3 lh-lg'>
                <div>Art & Design</div>
                <div>Business</div>
                <div>Data Science</div>
                <div>Development</div>
                <div>Finance</div>
                <div>Health & Fitness</div>
                <div>Lifestyle</div>
                <div>Marketing</div>
                <div>Music</div>
                <div>Personal Development</div>
            </div>
        </div>
    );
}

export default CourseCategory;