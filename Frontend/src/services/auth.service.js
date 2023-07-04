import axios from "axios"
import { logout } from "./user.service";
var URL = "http://127.0.0.1:8000/"
const updateToken = async ()=>{
    console.log("update access token ");
    let refresh= localStorage.getItem("refresh");
    let accessToken = localStorage.getItem("access");
    let body = {refresh: refresh}
    const auth = {
        headers:{Authorization:`Bearer ${accessToken}`}
    }
    console.log(refresh)
    if (refresh){
        let response =await axios.post(URL+'token/refresh/',body,auth )
        .then(res =>{
            if(res.status==200){
                localStorage.setItem("access",res.data.access)
                
            }else{
                logout()
            }
        })
        .catch(err => {
            console.error(err)
            return err.status
        })

    }
}
export {
    updateToken,
}