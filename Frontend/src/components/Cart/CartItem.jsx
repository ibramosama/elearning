import itemStyle from './Cart.module.css'
function CartItem(props) {
    return ( 
        <div className={`${itemStyle.item_Cart} container d-flex justify-content-center`}>
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
                {console.log(props)}
                <div className={`${itemStyle.course_price}`}>
                        {props?.course.price}$
                </div>
            </div>
            <div>
                <div className='mb-2 ms-4 mt-2 fs-3'>Description:</div>
                <div className='mb-5 ms-4'>{props?.course.description}</div>
                <button type="button" className={`btn btn-primary ms-4 fs-4 p-3`}>enrollment</button>
            </div>
        </div>
        
    );
}

export default CartItem;
