import navStyle from './MainNavigation.module.css';
import {Outlet ,useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import {logout} from '../../../services/user.service'
function MainNavigation() {
    const {authUser}=useContext(AuthContext)
    const navigate = useNavigate()
    const handleNav =(link)=>{
        navigate(link)
    }
    const handel_logout =() =>{
        logout()
        window.location.reload()
    }
    return ( 
        <>
        
        <div className={`${navStyle.mainnav} w-100 pt-3 pb-3`}>
            <div className='container-lg container-sm-fluid d-flex align-item-center justify-content-between flex-wrap '>
                <div className='d-flex align-item-center'>
                    <div 
                    onClick={()=>(handleNav('/home'))}
                    className={`${navStyle.logo} fs-3 ms-lg-4`} >
                        Edu
                    <span className={`${navStyle.logo_span}`}>Mall</span>
                    </div>
                    <div className={`${navStyle.between_line}`}>|</div>
                    <div className={`${navStyle.search}`}>
                        <input type='text' className={`${navStyle.search_input}`} placeholder='search ...'/>
                    </div>
                </div>
                { authUser?.username  ? 
                
                    <div className='d-flex align-items-center me-lg-4'>
                        
                        <div 
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown" aria-expanded="false"
                        className={`${navStyle.user_name} dropdown`}>{authUser?.username}</div>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="">Profile</a>
                            <a className="dropdown-item" href="/cart">My Cart</a>
                            <a className="dropdown-item" href="" onClick={handel_logout}> Log out </a>
                        </div>
    
                        <img src={'http://127.0.0.1:8000'+authUser.image} className={`${navStyle.user_img} me-3`}></img>
                        <i onClick={handel_logout} className={`${navStyle.logout} bi bi-door-open ms-3 me-3`}></i>
                    </div>
                : 
                    <div className='d-flex align-items-center me-lg-4'>
                        <div className={`${navStyle.cart_btn}`}>
                            <i className="bi bi-bag-check"></i>
                        </div>
                        
                        <button 
                        onClick={()=>(handleNav('/login'))}
                        type="button" 
                        className={`btn btn-primary me-3 ${navStyle.sign_btn}`}>Sign In</button>
                        <button 
                        onClick={()=>(handleNav('/register'))}
                        type="button" 
                        className={`btn btn-primary  ${navStyle.sign_btn} me-4`}>Sign up </button>
                    </div> 
                }
                
                
                
            </div>
            
        </div>
        <Outlet />
        </>
        
        
    );  
}

export default MainNavigation;