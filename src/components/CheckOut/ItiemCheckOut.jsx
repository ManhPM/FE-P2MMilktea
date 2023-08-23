import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import classes from './ItiemCheckOut.module.css'
import Table from 'react-bootstrap/Table';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../apiRequest/axios';
import Mapbox from "../Mapbox/Mapbox";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const ItiemCheckOut = () => {
    const token = localStorage.getItem('token')
    const latitude = localStorage.getItem('latitude')
    const longitude = localStorage.getItem('longitude')
    const navigate = useNavigate();

    const [message,setMessage] = useState('')
    const [error,setError] = useState('')
    const [value, setValue] = useState(1);
    const [paysmethod, setPaysmethod] = useState([]);
    const [pays,setPays] = useState('');
    const [items, setItems] = useState([])
    const [description,setDescription] = useState('Ghi Chu')
    const [shippings,setShippings] = useState([])
    const [code,setCode] = useState('')
    const [selectedShipper, setSelectedShipper] = useState('')
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
        console.log(res)
        return res
    }
    const getShipping_partners = async() => {
        const res = await api.get("/shipping_partners")
        console.log(res)
        return res
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
        else{
            try{
                navigate("/payment")
            }catch(error){
            }
        }
    }

    // gọi items trong cart
    useEffect(() => {
      
        getData().then((res) => {
          setItems(res.data.itemList)
        })
        getData().catch((err) => {
        })
    },[value])

    // goi methods payment
    useEffect(() => {
        getPayment().then((res) => {
            setPaysmethod(res.data.paymentList)
        })
        getShipping_partners().then((res) => {
            setShippings(res.data.shipping_partnerList)
        })
    },[])
    
    const handleChangePay = (e) => {
        setPays(e.target.value)
    }
    const handleChangeDes = (e) => {
        setDescription(e.target.value)
    }
    const handleChangeShipper = (e) => {
        setSelectedShipper(e.target.value)
    }
    const handleIncrement = (id_item) =>{
        api.post(`cart/increase/${id_item}`,{},
        {
            headers: {
                access_token: token
            }
        })
        .then(function (res) {
            toast.success('Tăng số lượng thành công', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            getData().then((res) => {
                setItems(res.data.itemList)
            })
            getData().catch((err) => {
                console.log(err)
            })
        })
        .catch(function (res) {
            toast.error('Thao tác thất bại', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
        setValue(value + 1)
    }
    const handleDecrement = (id_item) =>{
        api.post(`cart/decrease/${id_item}`,{},
        {
            headers: {
                access_token: token
            }
        })
        .then(function (res) {
            toast.success(`${res.data.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }); 
            getData().then((res) => {
                setItems(res.data.itemList)
            })
            getData().catch((err) => {
            })
        })
        .catch(function (res) {
            toast.error(`${res.response.data.message}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
        setValue(value - 1)
    }
    const handleDelteitem = async (id_item) => {
        setValue(value + 1)
        api.delete(`cart/remove/${id_item}`,
        {
            headers: {
                access_token: token
            }
        })
        .then(function (res) {
            setValue(value + 1)
            toast.success('Đã xoá khỏi giỏ hàng', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }); 
            getData().then((res) => {
                setItems(res.data.itemList)
            })
            getData().catch((err) => {
            })
        })
        .catch(function (res) {
            toast.warn('Thao tác thất bại', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    }
    
    return (
        <div className="container">
            {items.map((item) =>{
            return(
            <div>
            <div className={classes["cart-item"]} key={item.id_item}>
                <CloseIcon className={classes["icon"]} 
                    onClick={() => handleDelteitem(item.id_item)}
                />
                <div className={classes["image-item"]}>
                    <img src={item.image} alt="food image" width="90px" height="90px"></img>
                </div>
                <div className={classes["name-item"]}>
                    <p onClick={() => navigate(`/product-detail/${item.id_item}`)}>{item.name}</p>
                </div>
                <div className={classes["price"]}>
                    <p>Đơn Giá : {item.price}</p>
                </div>
                <div className={classes["input-quantity"]}>
                        <button onClick={() => handleIncrement(item.id_item)}> + </button>
                        <button>{item.amount}</button>
                        <button onClick={() => handleDecrement(item.id_item)}> - </button>
                </div>
                <div className={classes["total-price"]}>
                    <p>Tổng Giá : {item.price * item.amount}</p>
                </div>
            </div>
            <hr></hr>
            </div>
            )})}
            <hr></hr>
            <div className={classes["message"]}>
                <p>{message}</p>
            </div>
            <div className={classes["handle__error"]}>
                <p>{error}</p>
            </div>
            <div className={classes["Check__out"]}>
                <button
                    onClick={CheckOut}
                >
                    Đặt Hàng
                </button>
            </div>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
        
    )
}

export default ItiemCheckOut