import { useEffect,useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../apiRequest/Authprovider"
import classes from './Profile.module.css'
import { Link } from "react-router-dom"


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
        <div style={{marginTop:"100px"}} className={classes["main-container"]}>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className={classes["user-info"]}>
                            <div className={classes["main-title"]}>
                                <h5>Thông tin cá nhân</h5>
                            </div>
                            <div className={classes["data-user"]}>
                                <div className={classes["title"]}>
                                    <h6>Tên</h6>
                                </div>
                                <div className={classes["value-info"]}>
                                    <h5>Đỗ Đức Hậu</h5>
                                </div>
                            </div>
                            <hr></hr>
                            <div className={classes["data-user"]}>
                                <div className={classes["title"]}>
                                    <h6>Email</h6>
                                </div>
                                <div className={classes["value-info"]}>
                                    <h5>Duchau051113@gmail.com</h5>
                                </div>
                            </div>
                            <hr></hr>
                            <div className={classes["data-user"]}>
                                <div className={classes["title"]}>
                                    <h6>SDT</h6>
                                </div>
                                <div className={classes["value-info"]}>
                                    <h5>0377359729</h5>
                                </div>
                            </div>
                            <hr />
                            <div className={classes["data-user"]}>
                                <div className={classes["title"]}>
                                    <h6>Địa chỉ</h6>
                                </div>
                                <div className={classes["value-info"]}>
                                    <h5>Quận 9 , Thành phố Thủ Đức , TpHCM</h5>
                                </div>
                            </div>
                            <hr></hr>
                            <Link to="/" onClick={() =>{
                                localStorage.clear()
                            }}>
                            <div className={classes["log-out"]}>
                                    <button>Đăng Xuất</button>
                            </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className={classes["info-pay"]}>
                            <div className={classes["main-title"]}>
                                <h5>Thông tin giao dịch</h5>
                            </div>
                            <div className={classes["pay-user"]}>
                                <div className={classes["title-pay"]}>
                                    <h6>Tổng đơn hàng </h6>
                                </div>
                                <div className={classes["pay-info"]}>
                                    <h5>15 đơn hàng</h5>
                                </div>
                            </div>
                            <hr />
                            <div className={classes["pay-user"]}>
                                <div className={classes["title-pay"]}>
                                    <h6>Đơn hàng thành công</h6>
                                </div>
                                <div className={classes["pay-info"]}>
                                    <h5>11</h5>
                                </div>
                            </div>
                            <hr />
                            <div className={classes["pay-user"]}>
                                <div className={classes["title-pay"]}>
                                    <h6>Đơn hàng thất bại</h6>
                                </div>
                                <div className={classes["pay-info"]}>
                                    <h5>4</h5>
                                </div>
                            </div>
                            <hr />
                            <div className={classes["total-pay"]}>
                                <div className={classes["title-pay"]}>
                                    <h5>Tổng giá trị giao dịch : </h5>
                                    <h6>500.000 vnd</h6>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;