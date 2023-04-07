import { useEffect,useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../redux/Authprovider"


const Profile = () => {
    const navigate = useNavigate()
    const user = useContext(AuthContext)
    console.log(user.auth)
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate("/")
        }
    
    },[])
    return(
        <div style={{marginTop:"100px"}}>
            Thông tin người dùng
        </div>
    )
}

export default Profile;