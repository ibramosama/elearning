import axios from "axios"

var URL = "http://127.0.0.1:8000/"
const getAllCategories = async ()=>{
    return await axios.get(URL+'course/categories/')
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
const getCourseByCategory= async(id)=>{
    return await axios.get(URL+`course/category/${id}/courses/`)
    .then(res =>{
        
        if(res.data.length != 0 ){
            console.log(res)
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

export{
    getAllCategories,
    getCourseByCategory
}