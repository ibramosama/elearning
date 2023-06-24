import { createContext, useState ,useEffect} from "react";
import jwt_decode from 'jwt-decode';
import { updateToken } from "../services/auth.service";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [authUser, setAuthUser] = useState({});
    let [loading,setLoading]=useState(true);
    let token = localStorage.getItem("access");
    useEffect(() =>{
        if(token){
            setAuthUser(token)

        }

        if (loading && authUser){
            updateToken();
            setLoading(false);
        }
        let interval = setInterval(()=>{
            if(authUser){
                updateToken()
                setLoading(false);
            }
        },5000)
        return ()=> clearInterval(interval)
    },[authUser,loading]);
    return (
        <AuthContext.Provider value = {{authUser, setAuthUser}}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider};