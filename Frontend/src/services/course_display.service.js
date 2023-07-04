import axios from "axios"
var URL = "http://127.0.0.1:8000/"
const get_course_data = async(id)=>{
    const auth = {
        headers:{Authorization:`Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NDU0MDcxLCJpYXQiOjE2ODg0MzYwNzEsImp0aSI6ImE5ODFkMjhmMGEyNTRjMTM4YzlhYmExZjViYTJkZTUxIiwidXNlcl9pZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifQ.QBW14dMSToehZWKhyV8joXsxze0Xz2UikBjIIebWFBA'}`}
    }
    return await axios.get(URL+'course/courses/'+id)
    .then(res =>{
        if(res.status==200){
            return res.data
        }
    }).catch(err => {
        return err
        }
    )
}
export {
    get_course_data
}