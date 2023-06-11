import React from "react";
import {useState,useEffect} from 'react'
import { useParams,useNavigate } from "react-router-dom";

import api from '../../apiRequest/axios';
import classes from './OderDetail.module.css'

const OrderDetail = () => {
    const token = localStorage.getItem('token');
    const {id_order} = useParams();

    const navigate = useNavigate()
    const [items,setItems] = useState([])
    const [infoOder,setInfoOder] = useState({})

    const getOrdersDetail = async() => {
        const res = await api.get(`/orders/detail/${id_order}`,{
            headers: {
                access_token: token
            }
        })
        return res
    }
    useEffect(() => {
      
        getOrdersDetail().then((res) => {
            setItems(res.data.itemList)
            setInfoOder(res.data.info)
            console.log(res)
        })
        getOrdersDetail().catch((err) => {
            console.log(err)
        })
    },[])
    //console.log(infoOder)

    const hanleCancelOrder =  () =>{
        try {
            api.get(`/orders/cancel/${id_order}`,{
                headers: {
                    access_token: token
                }
            })
            navigate('/orders')
        } catch (error) {
            console.log(error);
        }
    
    }

    function Status(e) {
        const order = e.value
        //console.log(order)
        if(order==0){
            return(
                <div className={classes["status-wait"]}>
                <p className={classes['text-wait']} >Chưa xác nhận </p>
                <button 
                        className={classes['cancle-button']}
                        onClick={hanleCancelOrder}
                    >
                        Huỷ đơn hàng
                </button>
                </div>
            )
        }
        if(order==1){
            return <p className={classes['text-confirm']} >Đã xác nhận </p>
        }
        else{
            return <p className={classes['text-cancel']}>Đã huỷ</p>
        }
    }


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
                                        <img src={item.image} alt="food image" width="90px" height="90px"></img>
                                    </div>
                                    <div className={classes["name-item"]}>
                                        <p>{item.name}</p>
                                    </div>
                                    <div className={classes["price"]}>
                                        <p>Đơn Giá : {item.price}</p>
                                    </div>
                                    <div className={classes["input-quantity"]}>
                                        <p>Số lượng: {item.quantity}</p>
                                    </div>
                                    <div className={classes["total-price"]}>
                                        <p>Tổng Giá : {item.price * item.quantity}</p>
                                    </div>
                                </div>
                            <hr></hr>
                            </div>
                        )})}
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className={classes["info__order"]}>
                            <div className={classes["info__order-title"]}>Thông tin thanh toán</div>
                            <div className={classes["info__user"]}>
                                <div className={classes["info__user-item"]}>
                                    <h1>Tên người dùng :</h1>
                                    <p> {infoOder.name_customer} </p>
                                </div>
                                <div className={classes["info__user-item"]}>
                                    <h1>Số điện thoại :</h1>
                                    <p> {infoOder.phone} </p>
                                </div>
                                <div className={classes["info__user-item"]}>
                                    <h1>Phương thức thanh toán:</h1>
                                    <p> {infoOder.name_payment} </p>
                                </div>
                                <div className={classes["info__user-item"]}>
                                    <h1>Đơn vị vận chuyển :</h1>
                                    <p> {infoOder.name_shipping_partner}</p>
                                </div>
                                <div className={classes["info__user-item"]}>
                                    <h1>Ghi chú :</h1>
                                    <p> {infoOder.description} </p>
                                </div>
                                <div className={classes["info__user-pay"]}>
                                    <h1>Tổng tiền hoá đơn :</h1>
                                    <p>{infoOder.item_fee} </p>
                                </div>
                                <div className={classes["info__user-deliveryfee"]}>
                                    <h1>Phí vận chuyển:</h1>
                                    <p> {infoOder.delivery_fee} </p>
                                </div>
                                <div className={classes["info__user-deliveryfee"]}>
                                    <h1>Tổng hoá đơn:</h1>
                                    <p> {infoOder.total} </p>
                                </div>
                                <div className={classes["info__user-deliveryfee"]}>
                                    <h1>Trạng thái đơn hàng :</h1>
                                    <p> <Status value={infoOder.status}/> </p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default OrderDetail