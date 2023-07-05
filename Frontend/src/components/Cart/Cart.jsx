import cartStyle from './Cart.module.css'
import {useParams , useNavigate} from 'react-router-dom';
import { useState ,useEffect,useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import {getCourseFromCart} from '../../services/addToCart.service'
import CartItem from './CartItem';
function Cart() {
    const {authUser}=useContext(AuthContext)
    const [Courses, SetCourses] =useState([])
    useEffect(() =>{
        console.log(authUser.user_id)
        getCourseFromCart(authUser.user_id).then(course =>{
            console.log(course[0].courses)
            if(course){
                SetCourses(course[0].courses)
            }else{
                SetCourses([])
            }
        }).catch((error)=>{
            console.log(error)
        })
    },[]);






    return ( 
        <div className="container-lg container-sm-fluid">
            
            <div className={`${cartStyle.title} mt-5 ms-lg-4 fs-3`}> Cart
            </div>
            {
                Courses && Courses.map((course ,key) => (
                    <CartItem key={key} course={course} ></CartItem>
                    // console.log(course)
                ))
            }
        </div>
    );
}

export default Cart;