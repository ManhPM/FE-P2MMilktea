import React from "react";
import {useState,useEffect} from 'react'
import { useParams,useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import {ToastContainer, toast} from "react-toastify"
import StarsIcon from '@mui/icons-material/Stars';
import 'react-toastify/dist/ReactToastify.css';


import api from '../../apiRequest/axios';
import classes from './OderDetail.module.css'

const OrderDetail = () => {
    const token = localStorage.getItem('token');
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [value, setValue] = useState(1);
    const [orderDetail, setOrderDetail] = useState([]);
    const {id_order} = useParams();

    const navigate = useNavigate()
    const [items,setItems] = useState([])
    const [infoOder,setInfoOder] = useState({})

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const getOrdersDetail = async() => {
        const res = await api.get(`/orders/detail/${id_order}`,{
            headers: {
                access_token: token
            }
        })
        toggleTab(0)
        return res
    }
    useEffect(() => {
      
        getOrdersDetail().then((res) => {
            setItems(res.data.itemList)
            setInfoOder(res.data.info)
        })
        getOrdersDetail().catch((err) => {
            console.log(err)
        })
    },[])

    const hanleCancelOrder =  () =>{
        try {
            api.get(`/orders/cancel/${id_order}`,{
                headers: {
                    access_token: token
                }
            })
            toast.success('Huỷ đơn hàng thành công!', {
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
                navigate('/orders')
            }, 2000);
        } catch (error) {
            toast.error('Huỷ đơn hàng thất bại!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    
    }

    function ReviewItem(item) {
        if(item.value[1] === 4){
            return(
                <>
                    {item.value[0].reviewed === 0 ? <p onClick={() => handleReviews(item.value[0])}><StarsIcon></StarsIcon></p>
                     : <p className="text-warning"><StarsIcon></StarsIcon></p>
                    }
                </>
            )
        }
        else{

        }
    }

    function Status(e) {
        const order = e.value
        if(order===0){
            return(
                <div className={classes["status-wait"]}>
                <p className="text-warning">Chưa xác nhận </p>
                <button 
                        className="btn btn-danger mt-3"
                        onClick={hanleCancelOrder}>
                        Huỷ đơn hàng
                </button>
                </div>
            )
        }
        if(order===1){
            return <div><p className="text-info">Đã xác nhận </p> 
            </div>
        }
        if(order===3){
            return <div>
                        <p className="text-warning">Đang giao hàng</p>
            </div>
        }
        if(order===4){
            return <div>
                        <p className="text-success">Hoàn thành</p>
            </div>
        }
        else{
            return <p className="text-danger">Đã huỷ</p>
        }
    }
    
    const toggleTab = (index) => {
        setValue(index);
        setComment("")
    }

    const handleReviews = (item) => {
        toggleTab(1)
        setOrderDetail(item);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try
        {
                api.post(`reviews/${orderDetail.id_item}?id_order=${orderDetail.id_order}`, {
                    comment,
                    rating
                },
                    {
                        headers: {
                            Access_token: token,
                        }
                    }
                )
                .then(res =>{
                    toast.success('Đánh giá thành công!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    getOrdersDetail();
                    getOrdersDetail().then((response) => {
                        setItems(response.data.itemList)
                        setInfoOder(response.data.info)
                    })
                    setTimeout(() => {
                        navigate(`/orders/${infoOder.id_order}`)
                    }, 2000);
                    getOrdersDetail();
                })
                .catch(res =>{
                        toast.error(`${res.response.data.message}`, {
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
                        navigate(`/orders/${infoOder.id_order}`)
                    }, 2000);
                })
            }catch(error){
                console.log(error);
        }
    };

    return(
        <div className={classes.container}>
            <div className={classes["title"]}>
                <h1>Chi Tiết Hoá Đơn</h1>
            </div>
            <div className="row">
                    <div className="col-12 col-md-8">
                        <div className={classes["list__items"]}>
                        {items.map((item) =>{
                        return(
                            <div>
                                <div className={classes["cart-item"]} key={item.id_item}>
                                    <div className={classes["image-item"]}>
                                        <img src={item.image} alt="Ảnh sản phẩm" width="90px" height="90px"></img>
                                    </div>
                                    <div className={classes["name-item"]}>
                                        <p>{item.name}</p>
                                    </div>
                                    <div className={classes["price"]}>
                                        <p>Đơn Giá: {item.price}</p>
                                    </div>
                                    <div className={classes["price"]}>
                                        <p>Số lượng: {item.quantity}</p>
                                    </div>
                                    <div className={classes["total-price"]}>
                                        <p>Tổng Giá :{item.price * item.quantity}</p>
                                    </div>
                                    <div className={classes["total-price"]}>
                                    <ReviewItem value={[item, infoOder.status]}></ReviewItem>
                                    </div>
                                </div>
                            <hr></hr>
                            </div>
                        )})}
                        </div>
                        <div className = {value===1 ? classes['content-active'] : classes['content-none']}>
                    <div className={classes["card"]}>
                        <div className={classes["col-10"]}>
                        <form onSubmit={handleSubmit}>
                            <div className={classes["comment-box ml-2"]}>
                            <strong><h4 style={{fontSize: "28px"}}>Đánh giá sản phẩm</h4></strong>
                            <div style={{marginBottom: "2px"}} className={classes["rating"]}>
                            <input type="radio" name="rating" onChange={handleRatingChange} value={5} id={5} required />
                            <label htmlFor={5}>☆</label>
                            <input type="radio" name="rating" onChange={handleRatingChange} value={4} id={4} />
                            <label htmlFor={4}>☆</label>
                            <input type="radio" name="rating" onChange={handleRatingChange} value={3} id={3} />
                            <label htmlFor={3}>☆</label>
                            <input type="radio" name="rating" onChange={handleRatingChange} value={2} id={2} />
                            <label htmlFor={2}>☆</label>
                            <input type="radio" name="rating" onChange={handleRatingChange} value={1} id={1} />
                            <label htmlFor={1}>☆</label>
                            </div>
                            <div className="comment-area">
                            <textarea
                                className="form-control"
                                placeholder="Viết bình luận của bạn tại đây."
                                onChange={handleCommentChange}
                                rows={4}
                                defaultValue={""}
                                name="comment"
                            />
                            </div>
                            <div className="comment-btns mt-2">
                            <div style={{marginTop: "12px"}} className="row">
                                <div className="col-6">
                                <div className="pull-left">
                                    <p onClick={()=> toggleTab(0)} className="btn btn-danger btn-sm">Huỷ<CancelIcon></CancelIcon></p>
                                </div>
                                </div>
                                <div className="col-6">
                                <div className="pull-right">
                                    <button type="submit" className="btn btn-success send btn-sm">
                                    Gửi <SendIcon></SendIcon>
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div style={{marginBottom: "50px"}} className={classes["info__order"]}>
                            <div className={classes["info__order-title"]}>Thông tin đơn hàng</div>
                            <div className={classes["info__user"]}>
                            <div className={classes["info__user-item"]}>
                                    <h1>Mã đơn hàng: </h1>&nbsp;
                                    <p> {infoOder.id_order} </p>
                                </div>
                                <div className={classes["info__user-item"]}>
                                    <h1>Tên người dùng: </h1>&nbsp;
                                    <p> {infoOder.name_customer} </p>
                                </div>
                                <div className={classes["info__user-item"]}>
                                    <h1>Số điện thoại: </h1>&nbsp;
                                    <p> {infoOder.phone} </p>
                                </div>
                                <div className={classes["info__user-item"]}>
                                    <h1>Phương thức TT: </h1>&nbsp;
                                    <p> {infoOder.name_payment} </p>
                                </div>
                                <div className={classes["info__user-item"]}>
                                    <h1>Đơn vị vận chuyển: </h1>&nbsp;
                                    <p> {infoOder.name_shipping_partner}</p>
                                </div>
                                <div className={classes["info__user-item"]}>
                                    <h1>Ghi chú: </h1>&nbsp;
                                    <p> {infoOder.description} </p>
                                </div>
                                <div className={classes["info__user-pay"]}>
                                    <h1>Tiền sản phẩm: </h1>&nbsp;
                                    <p>{infoOder.item_fee} </p>
                                </div>
                                <div className={classes["info__user-deliveryfee"]}>
                                    <h1>Phí vận chuyển: </h1>&nbsp;
                                    <p> {infoOder.delivery_fee} </p>
                                </div>
                                <div className={classes["info__user-deliveryfee"]}>
                                    <h1>Tổng hoá đơn: </h1>&nbsp;
                                    <p> {infoOder.total} </p>
                                </div>
                                <div className={classes["info__user-deliveryfee"]}>
                                    <h1>Trạng thái đơn hàng: </h1>&nbsp;
                                    <p> <Status value={infoOder.status}/> </p>
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
            </div>
            
            </div>
    )
}

export default OrderDetail