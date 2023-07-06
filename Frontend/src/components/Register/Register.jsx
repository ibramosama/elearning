import style from './Register.module.css';
import { useState ,useRef ,useEffect} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import {register} from '../../services/user.service';
function Register() {
    const navigate = useNavigate();
    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    let [FormsValues ,setFormsValues] = useState({
        username:'',
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        phone:'',
        role:'',
        image:null
    });

    let [RegisterError,setRegisterError] =useState(false) 
    const [disabled,setDisabled] = useState(true);
    let Inputemail =useRef(null)
    let Inputpassword =useRef(null)
    let Inputfirstname =useRef(null)
    let Inputlastname =useRef(null)
    let Inputusername= useRef(null)
    let Inputphone=useRef(null)
    //  errer msg if field have something wrong 
    let [errors ,setErrors] = useState({
        username:null,
        phone:null,
        firstname:null,
        lastname:null,
        email:null,
        password:null
    })
    
    let [errorRun,setErrorsRun]=useState(false)
    const handelsubmit = (event)=>{
        setRegisterError(false)
        event.preventDefault();
        console.log(errors.email ,errors.password)
        if(errors.email 
            || errors.password 
            || errors.firstname 
            || errors.lastname
            || errors.phone
            || errors.username
            ){
            setErrorsRun(true);
        }else{
            if(FormsValues){
                console.log(FormsValues.image)
                let formData = new FormData(); 
                formData.append('email',FormsValues.email)
                formData.append("username",FormsValues.username)
                formData.append("first_name",FormsValues.firstname)
                formData.append("last_name",FormsValues.lastname)
                formData.append("password",FormsValues.password);
                formData.append("phone_number",FormsValues.phone)
                formData.append('image',FormsValues.image)
                formData.append('role',FormsValues.role)
                register(formData).then((result)=>{
                    console.log(result)
                    if(result == 201){
                        setTimeout(() => {
                            navigate('/login')
                        }, 2000);
                    }else{
                        setRegisterError(true)

                    }
                }).catch((error)=>{
                    setRegisterError(true)
                })
            }
            setErrorsRun(false);
        }
        
        // console.log(FormsValues)
    }
    const operationHandeler = (e) =>{
        // eslint-disable-next-line
        // setErrorsRun(false)
        console.log(errors)
        console.log(e.target)
        if(e.target.name == "email"){
            let regex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            console.log(regex.test(e.target.value))
            console.log(e.target.value)
            if( regex.test(e.target.value) ){
                setErrors({...errors,email:null})
                setFormsValues({...FormsValues, [e.target.name]:e.target.value})
            }else{
                
                setErrors({...errors,email:'invalid email address ! , example formate mahmoud@example.com'});
            }
            console.log(errors)
        }
        if(e.target.name == "username"){
            

            if( e.target.value ){
                setErrors({...errors,username:null})
                setFormsValues({...FormsValues, [e.target.name]:e.target.value})
            }else{
                setErrors({...errors,username:'invalid username'});
            }
            console.log(errors)
            
        }
        if(e.target.name == "phone"){
            

            if( e.target.value ){
                setErrors({...errors,phone:null})
                setFormsValues({...FormsValues, [e.target.name]:e.target.value})
            }else{
                setErrors({...errors,username:'invalid phone'});
            }
            console.log(errors)
            
        }
        if(e.target.name == "firstname"){
            

            if( e.target.value ){
                setErrors({...errors,firstname:null})
                setFormsValues({...FormsValues, [e.target.name]:e.target.value})
            }else{
                setErrors({...errors,firstname:'invalid firstname'});
            }
            console.log(errors)
            
        }
        if(e.target.name == "lastname"){
            

          if( e.target.value ){
              setErrors({...errors,lastname:null})
              setFormsValues({...FormsValues, [e.target.name]:e.target.value})
          }else{
              setErrors({...errors,lastname:'invalid lastname'});
          }
          console.log(errors)
          
        }
        // eslint-disable-next-line
        if(e.target.name == "password"){
            if(e.target.value.length >= 6){
                setFormsValues({...FormsValues, [e.target.name]:e.target.value})
                setErrors({...errors,password:null})
            }
            else{
                setErrors({...errors,password:'password must be at least 6 characters !'});
            }
        }
        if(e.target.name == "image"){
          console.log(e.target.value)
          console.log(e.target.files[0])
          if(e.target.files[0]){  
            setFormsValues({...FormsValues,[e.target.name]:e.target.files[0]})
          } 
        }
        if(e.target.name == "role"){
            console.log(e.target.value)
            if(e.target.value){
                setFormsValues({...FormsValues, [e.target.name]:e.target.value})
            }
        }

        // check disabled submit btn based on data
        console.log(Inputpassword.current.value.length)
        if(!Inputpassword.current.value.length  || 
           !Inputemail.current.value.length     ||  
           !Inputfirstname.current.value.length || 
           !Inputlastname.current.value.length ){
            setDisabled(true);
        }
        else{
            setDisabled(false);
        }
       
    }
    

    return ( 
        <div className={`${style.register_from} container`}>
            <div className="row justify-content-center mt-5">

                <div className={`${style.sign_form}`}>
                    <div className={`${style.form_content}`}>
                        <div className={`${style.header_from}`}>Sign Up Udemy</div>
                        
                        <div className='text-center'> already have an account ? <span className={`${style.sign_text}`}><Link to="/login" className={`${style.sign_text}`}>sign in</Link></span> </div>
                        <div>
                            
                            <div className='mt-4'>
                                <hr className={`${style.break_line}`}></hr>
                                <div className={`text-center ${style.line_content}`}>or Sign up with Email</div>
                            </div>
                            { RegisterError ? (
                                    <div>
                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                            <strong>Erorr</strong> email already exists ,please try another email !
                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>
                                    </div>
                                    
                                ):null}
                            <form onSubmit={handelsubmit}>
                                <div className="mb-2">
                                    <label htmlFor="exampleInputusername1" className={`${style.form_label}`}>User Name </label>
                                    <input type="text" 
                                    onChange={operationHandeler} 
                                    ref={Inputusername}
                                    name="username"
                                    className={`${(errors.username && errorRun) ? style.error_input:style.form_input}`}
                                    id="exampleInputEmail1" 
                                    placeholder=' mahmoud0020  ' aria-describedby="emailHelp"/>
                                    {/* validation error msg  */}
                                    <div className={`${style.errorMsg}`}>
                                    {(errors.username && errorRun) ? errors.username : null}
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="exampleInputusername1" className={`${style.form_label}`}>First Name </label>
                                    <input type="text" 
                                    onChange={operationHandeler} 
                                    ref={Inputfirstname}
                                    name="firstname"
                                    className={`${(errors.firstname && errorRun) ? style.error_input:style.form_input}`}
                                    id="exampleInputEmail1" 
                                    placeholder=' mahmoud  ' aria-describedby="emailHelp"/>
                                    {/* validation error msg  */}
                                    <div className={`${style.errorMsg}`}>
                                    {(errors.firstname && errorRun) ? errors.firstname : null}
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="exampleInputusername1" className={`${style.form_label}`}>Last Name </label>
                                    <input type="text" 
                                    onChange={operationHandeler} 
                                    ref={Inputlastname}
                                    name="lastname"
                                    className={`${(errors.firstname && errorRun) ? style.error_input:style.form_input}`}
                                    id="exampleInputEmail1" 
                                    placeholder=' ramadan  ' aria-describedby="emailHelp"/>
                                    {/* validation error msg  */}
                                    <div className={`${style.errorMsg}`}>
                                    {(errors.lastname && errorRun) ? errors.lastname : null}
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="exampleInputEmail1" className={`${style.form_label}`}>Your Email </label>
                                    <input type="text" 
                                    onChange={operationHandeler} 
                                    ref={Inputemail}
                                    name="email"
                                    className={`${(errors.email && errorRun) ? style.error_input:style.form_input}`}
                                    id="exampleInputEmail1" 
                                    placeholder=' mahmoud@mail.com ' aria-describedby="emailHelp"/>
                                    {/* validation error msg  */}
                                    <div className={`${style.errorMsg}`}>
                                    {(errors.email && errorRun) ? errors.email : null}
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="exampleInputPassword1" className={`${style.form_label}`}>Password</label>
                                    <input type="password"
                                    onChange={operationHandeler} 
                                    ref={Inputpassword}
                                    name="password"
                                    className={`${(errors.password && errorRun) ? style.error_input:style.form_input}`}
                                    placeholder=' Min. 6 character' 
                                    id="exampleInputPassword1"/>
                                    {/* validation error msg  */}
                                    <div className={`${style.errorMsg}`}>
                                    {(errors.password && errorRun) ? errors.password : null}
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="exampleInputusername1" className={`${style.form_label}`}>Phone </label>
                                    <input type="text" 
                                    onChange={operationHandeler} 
                                    ref={Inputphone}
                                    name="phone"
                                    className={`${(errors.phone && errorRun) ? style.error_input:style.form_input}`}
                                    id="exampleInputEmail1" 
                                    placeholder=' 01112223334  ' aria-describedby="emailHelp"/>
                                    {/* validation error msg  */}
                                    <div className={`${style.errorMsg}`}>
                                    {(errors.phone && errorRun) ? errors.phone : null}
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label for="formFile" class={`${style.form_label}`}>Upload Your image</label>
                                    <input  
                                    name="image"
                                    accept="image/jpeg,image/png,image/gif"
                                    onChange={operationHandeler} 
                                    class={`${style.form_input}`} 
                                    id="formFileLg" type="file"></input>
                                    
                                </div>
                                <div className="mb-2">
                                    <label for="exampleFormControlInput1" class="form-label">Type User</label>
                                    <select 
                                    name="role"
                                    onChange={operationHandeler} 
                                    class="form-select"
                                    aria-label="Default select example">
                                        
                                        <option selected value="student">Student</option>
                                        <option value="instructor">Instructor</option>
                                        
                                    </select>
                                </div>
                             
          
                                <div>
                                    <button type="submit" disabled={disabled} className={`${style.form_submit_btn}`}>Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;