import itemStyle from './Cart.module.css'
import {useParams , useNavigate} from 'react-router-dom';
import { useState ,useEffect,useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {enrollmentUser} from '../../services/user.service';
import Notification from '../Notification/Notification';
function CartItem(props) {
    let [toastSuccessMsq,SettoastSuccessMsq] = useState(false)
    let [toastfailureMsq,SettoastfailureMsq] = useState(false)
    const {authUser}=useContext(AuthContext)
    const handel_enrollment = ()=>{
        SettoastSuccessMsq(false)
        SettoastSuccessMsq(false)
        let data = {
            user: authUser.user_id,
            course:props.course.id
        }
        enrollmentUser(data).then((res)=>{
            console.log(res)
            SettoastSuccessMsq(true)
        }).catch((err)=>{
            console.log(err)
            SettoastfailureMsq(true)
        })
    }
    return ( 
        <div className={`${itemStyle.item_Cart} container d-flex justify-content-center`}>
            {toastSuccessMsq ? (
            <Notification msg={"enrolled to this course successfuly !"} context={true}></Notification>
            ):''}
            {toastfailureMsq ? (
            <Notification msg={"can not enroll this course !"} context={false}></Notification>
            ):''}
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
                        {props?.course.price}$
                </div>
            </div>
            <div>
                <div className='mb-2 ms-4 mt-2 fs-3'>Description:</div>
                <div className='mb-5 ms-4'>{props?.course.description}</div>
                <button type="button" className={`btn btn-primary ms-4 fs-4 p-3`} onClick={handel_enrollment}>enrollment</button>
            </div>
        </div>
        
    );
}

export default CartItem;
