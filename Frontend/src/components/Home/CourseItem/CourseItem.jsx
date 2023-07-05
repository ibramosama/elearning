import itemStyle from './CourseItem.module.css'
function CourseItem(props) {
    return ( 
        <div className={`${itemStyle.item_card} mt-3 mb-2 flex-fill `}>
            <div className={`${itemStyle.image_card}`}>
                <img src={props?.course?.course_image} className={`${itemStyle.item_img_card}`}/>
            </div>
            <div className={`${itemStyle.level} mb-2`}>
                {props?.course?.level}
            </div>
            <div className={`${itemStyle.course_title}`}>
                {props?.course?.title}
            </div>
            <div className={`${itemStyle.course_price}`}>
            {props?.course?.price}$
                </div>
        </div>
    );
}

export default CourseItem;