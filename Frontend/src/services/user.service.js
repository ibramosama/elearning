import axios from "axios"


var URL = "http://127.0.0.1:8000/"


const login = async (loginData)=>{
   
    console.log(loginData)
    return await axios.post(URL+'login/',loginData)
    .then(res =>{
        if(res.status == 200 ){
            let access =res.data.access;
            let refresh =res.data.refresh;
            if(access && refresh){
                localStorage.setItem("access", access);
                localStorage.setItem("refresh", refresh);
            }
        }
        return res.status;
    })
    .catch(err => {
        console.error(err)
        return err.status
        }
    )
}
const register = async(registerData)=>{
    return await axios.post(URL+'register/', registerData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    .then(res =>{
        return res.status;
    })
    .catch(err => {
        console.error(err)
        return err.status
        }
    )
}
const logout =( ) =>{
    localStorage.clear();
    window.location.reload();
}
export {
    login,
    register,
    logout
}