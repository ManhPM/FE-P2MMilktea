import { useEffect,useContext,useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


import AuthContext from "../../apiRequest/Authprovider"
import classes from './Profile.module.css'
import api from '../../apiRequest/axios';

const Profile = () => {
    const token = localStorage.getItem('token')
    const [info,setInfo] = useState({})
    const navigate = useNavigate()
    // const {auth,setAuth} = useContext(AuthContext)

    // console.log(auth)


    const getInfo = async() => {
        const res = await api.get("/account/userinfo",{
            headers: {
                access_token: token
            }
        })
        return res
    }

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate("/")
        }
        getInfo().then((res) => {
            setInfo(res.data.userInfo)
            // console.log(res)
        })
        getInfo().catch((err) => {
            console.log(err)
        })
    },[])

    // console.log(info)
    const handleSubmit = (e) =>{
        e.preventDefault();

        try{
        {
            api.put(`account/updateprofile`, {
                name: info.name,
                phone: info.phone,
                address: info.address
            },
                {
                    headers: {
                        Access_token: token,
                    }
                }
            )
            .then(res =>{
                toast.success('Cập nhập thông tin thành công', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            })
            .catch(err =>{
                console.log(err)
                toast.error('Thao tác thất bại', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            })
            
        }
        
        }catch(error){
            console.log(error);
        }
        
    }
    const handleChange= (e) => {
        setInfo(info => ({
          ...info,  
          [e.target.name]: e.target.value
        }));
    }
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
                                    <input name="name" value={info.name} type="text" onChange={handleChange}/>
                                </div>
                            </div>
                            <hr></hr>
                            <div className={classes["data-user"]}>
                                <div className={classes["title"]}>
                                    <h6>Email</h6>
                                </div>
                                <div className={classes["value-info"]}>
                                    <h5>{info.email}</h5>
                                </div>
                            </div>
                            <hr></hr>
                            <div className={classes["data-user"]}>
                                <div className={classes["title"]}>
                                    <h6>SDT</h6>
                                </div>
                                <div className={classes["value-info"]}>
                                    <input name="phone" value={info.phone} type="text" onChange={handleChange}/>
                                </div>
                            </div>
                            <hr />
                            <div className={classes["data-user"]}>
                                <div className={classes["title"]}>
                                    <h6>Địa chỉ</h6>
                                </div>
                                <div className={classes["value-info"]}>
                                    <input 
                                        className={classes["input-location"]}
                                        name="address" 
                                        value={info.address}
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <hr></hr>
                            <div className={classes["button__update"]}> 
                                <Link to="/" onClick={() =>{
                                    localStorage.clear()
                                }}>
                                <div className={classes["log-out"]}>
                                    <button>Đăng Xuất</button>
                                </div>
                                </Link>
                                <div className={classes["button-update"]} onClick={handleSubmit}>
                                    <button>Cập nhập thông tin</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className={classes["info-pay"]}>
                            <div className={classes["main-title"]}>
                                <h5>Tổng     giao dịch</h5>
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
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}

export default Profile;