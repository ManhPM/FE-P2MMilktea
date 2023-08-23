import React from "react";
import {useState,useEffect} from 'react'
import { useParams,useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Mapbox from "../Mapbox/Mapbox";

import api from '../../apiRequest/axios';
import classes from './PaymentDetail.module.css';
import LabledInput from "../UI/Input/LabledInput";

const PaymentDetail = () => {
    const token = localStorage.getItem('token')
    const latitude = localStorage.getItem('latitude')
    const longitude = localStorage.getItem('longitude')
    const navigate = useNavigate();

    const [value, setValue] = useState(1);
    const [paysmethod, setPaysmethod] = useState([]);
    const [pays,setPays] = useState('');
    const [items, setItems] = useState([]);
    const [discount,setDiscount] = useState("");
    const [description,setDescription] = useState('Ghi Chu')
    const [shippings,setShippings] = useState([])
    const [code,setCode] = useState('')
    const [selectedShipper, setSelectedShipper] = useState('')
    const [error,setError] = useState("")
    const payments = [...paysmethod]

    const getData = async() => {
        const res = await api.get("/cart",{
            headers: {
                access_token: token
            }
        })
        return res
    }
    const getPayment = async() => {
        const res = await api.get("/payment_methods",{
            headers: {
                access_token: token
            }
        })
        return res
    }
    const getShipping_partners = async() => {
        const res = await api.get("/shipping_partners",{
            headers: {
                access_token: token
            }
        })
        return res
    }

    useEffect(() => {
        getPayment().then((res) => {
            setPaysmethod(res.data.paymentList)
        })
        getShipping_partners().then((res) => {
            setShippings(res.data.itemList)
        })
    },[])
    useEffect(() => {
      
        getData().then((res) => {
          setItems(res.data.itemList)
        })
        getData().catch((err) => {
          console.log(err)
        })
    },[value])

    const handleChangePay = (e) => {
        setPays(e.target.value)
    }
    const handleChangeDes = (e) => {
        setDescription(e.target.value)
    }
    const handleChangeShipper = (e) => {
        setSelectedShipper(e.target.value)
    }
    const handleChangeDiscount = (e) => {
        setDiscount(e.target.value)
    }

    const CheckOut = () => {
        if(items.length===0){
            return(
                toast.error('Giỏ hàng không có sản phẩm', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            ))
        }
        if(pays===''){
            return(
                toast.error('Vui lòng chọn phương thức thanh toán', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            ))
        }
        if(selectedShipper===''){
            return(
                toast.error('Vui lòng chọn phương thức thanh toán', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            ))
        }
        else{
            try{
                api.post('/cart/checkout', {
                    id_payment: pays,
                    description: description,
                    id_shipping_partner: selectedShipper,
                    userLat: latitude,
                    userLng:longitude,
                    code: discount
                },
                    {
                        headers: {
                            access_token: token,
                        }
                    }
                )
                .then(res =>{
                    
                    setValue(value + 1)
                    toast.success('Đặt Hàng Thành Công', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        navigate('/orders')
                    }, 2000);
                })
                .catch(err =>{
                    toast.error(<div>{err.response.data.message}</div>, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                })
            }catch(error){
            console.log(error.response.data);
            }
        }
    }
    return(
        <div className={classes.container}>
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
                                    <div className={classes["price"]}>
                                        <p>Số lượng: {item.amount}</p>
                                    </div>
                                    <div className={classes["total-price"]}>
                                        <p>Tổng Giá : {item.price * item.amount}</p>
                                    </div>
                                </div>
                            <hr></hr>
                            </div>
                        )})}
                        {/* <div>Tổng Giá</div>
                        <hr></hr> */}
                        <div className={classes["map__box"]}>
                            <Mapbox/>
                        </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className={classes["payment__method"]}>
                            <p>Chọn Phương thức thanh toán:</p>
                            <select name="lang" id="lang-select" multiple onChange={handleChangePay} className={classes["set__payment"]}>
                            {payments.map((pay) => {
                            return(
                                <option value={pay.id_payment}>
                                {pay.name}
                                </option>
                            )})}   
                            </select>
                            <p>Thêm ghi chú cho đơn hàng</p>
                            <textarea name="message" rows="7" cols="38" placeholder="Ghi Chú" onChange={handleChangeDes}></textarea>
                            <p>Chọn đơn vị vận chuyển:</p>
                            <select name="lang" id="lang-select" multiple onChange={handleChangeShipper} className={classes["set__payment"]}>
                            {shippings.map((shipping) => {
                                return(
                                <option value={shipping.id_shipping_partner}>
                                {shipping.name}
                                </option>
                            )})}   
                            </select>
                            <div className={classes["discount"]}>
                                <LabledInput
                                    label="Nhập mã giảm giá"
                                    name="sale"
                                    placeholder="Nhập mã giảm giá"
                                    onChange={handleChangeDiscount}
                                />
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
            {/* <div className={classes["map__box"]}>
                    <Mapbox/>
            </div> */}
            <div className={classes["Check__out"]}>
                <button
                    onClick={CheckOut} style={{marginBottom: "100px"}}
                >
                    Đặt Hàng
                </button>
            </div>
        </div>
    )
}

export default PaymentDetail