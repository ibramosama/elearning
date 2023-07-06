import YourInstructor from './YourInstructor/YourInstructor'
import ReviewForm from './ReviewForm/ReviewForm'
import ReviewsPage from './ReviewsPage/ReviewsPage';
function CourseInstructor() {
    return ( 
        <div>
            <YourInstructor></YourInstructor>
            <ReviewsPage></ReviewsPage>
            <ReviewForm></ReviewForm>
        </div>
    );
}

export default CourseInstructor;