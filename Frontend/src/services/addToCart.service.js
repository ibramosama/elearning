import axios from "axios"

var URL = "http://127.0.0.1:8000/"
const addToCart =async (data)=>{
    console.log(data)
    let refresh= localStorage.getItem("refresh");
    let accessToken = localStorage.getItem("access");
    const auth = {
        headers:{Authorization:`Bearer ${accessToken}`}
    }
    return await axios.post(URL+'course/add-to-cart/',data, auth)
    .then(res =>{
        if(res.data.length != 0 ){
            return res.data
        }
        else{
            return 404
        }
    }).catch(err => {
        console.error(err)
        return err.status
        }
    )
}

const getCourseFromCart = async (data)=>{
    console.log(data)
    let refresh= localStorage.getItem("refresh");
    let accessToken = localStorage.getItem("access");
    const auth = {
        headers:{Authorization:`Bearer ${accessToken}`}
    }
    return await axios.get(URL+'course/add-to-cart/', auth)
    .then(res =>{
        if(res.data.length != 0 ){
            return res.data
        }
        else{
            return 404
        }
    }).catch(err => {
        console.error(err)
        return err.status
        }
    )
}
export {
    addToCart,getCourseFromCart
}