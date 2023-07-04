import axios from "axios"

var URL = "http://127.0.0.1:8000/"
const getCourseDetails =async (id)=>{
    return await axios.get(URL+'course/course-list/'+id)
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
    getCourseDetails
}