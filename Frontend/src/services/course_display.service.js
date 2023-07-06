import axios from "axios"
var URL = "http://127.0.0.1:8000/"
const get_course_data = async(id)=>{
    let refresh= localStorage.getItem("refresh");
    let accessToken = localStorage.getItem("access");
    const auth = {
        headers:{Authorization:`Bearer ${accessToken}`}
    }
    return await axios.get(URL+'course/courses/'+id)
    .then(res =>{
        if(res.status==200){
            return res.data
        }
        console.log()
    }).catch(err => {
        return err
        }
    )
}
export {
    get_course_data
}