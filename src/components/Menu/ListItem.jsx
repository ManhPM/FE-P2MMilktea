import React from "react";
import classes from './ListItem.module.css'
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RatingStars from "../UI/RatingStars/Index";
import Footer from "../UI/Footer/index";
import { useState,useEffect,useContext } from "react";
import api from '../../apiRequest/axios';
import { useNavigate } from "react-router-dom";

import AuthContext from "../../apiRequest/Authprovider";

const ListItem = () =>{
    const [listItems,setListItems] = useState([])
    const [types, setTypes] = useState([])
    const [activeTypes, setActiveTypes] = useState(1)
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const quantity = {quantity: 1}
    // useContext
    const {auth,setAuth} = useContext(AuthContext);
    //api lay loại hàng
    const getTypes = async() => {
        const res = await api.get("/types")
        return res
    }
    useEffect(() => {
      
        getTypes().then((res) => {
          setTypes(res.data)
          console.log(res.data)
          setAuth(res.data)
          
        })
        getTypes().catch((err) => {
          console.log(err)
        })
    },[])

    const getData = async() => {
        const res = await api.get("/items?id_type=1")
        return res
    }
    useEffect(() => {
      
        getData().then((res) => {
          setListItems(res.data.itemList)
          
        })
        getData().catch((err) => {
          console.log(err)
        })
    },[])
    

    //api lấy danh sách item
    const fetchData = async (id_type) => {
        const res = await api.get(`/items?id_type=${id_type}`)
        const data = res.data.itemList;
        return data;
        
    }

    const handleTypes = async (id_type) => {
        const currentData = await fetchData(id_type);
        //console.log(data.selected + 1)
        setListItems(currentData);
        setActiveTypes(id_type);
    }
    console.log(listItems)
    const handleAddToCart = async (id_item) => {
        api.post(`cart/add/${id_item}`,quantity,
        {
            headers: {
                access_token: token
            }
        })
        .then(function (res) {
            console.log(res) 
        })
        .catch(function (res) {
            console.log(res)
        });
    }
    return (
        <div>
            <div className="container">
                <h1 className={classes['head-content']}>Thực đơn hôm nay</h1>
                <div className={classes['list-type']}>
                    {types.map((type) =>{
                        return(
                        <div 
                        key={type.id_type}
                        className={ activeTypes===type.id_type ? classes['active_type'] : classes['']}
                         
                        onClick={e => handleTypes(type.id_type)}
                        >
                            <span>{type.name}</span>
                        </div>
                    )})}
                    
                    
                </div>
                <div className="container">
                    <div className="row ">
                    {listItems.map((listItem) =>{
                        return(

                        
                            <div 
                            key = {listItem.id_item}
                            className="col-lg-6 mb-5 "
                            >
                                <div className={classes['container-item']}>
                                     <div className={classes['image-item']}>
                                    <img src={listItem.image} alt="food image" width="200px" height="200px"></img>
                                </div>
                                <div className={classes['des-item']} >
                                <div className={classes['item-detail']}>
                                    <span className={classes.namefood}
                                          onClick={() => navigate(`/product-detail/${listItem.id_item}`)}  
                                    >
                                        {listItem.name}
                                    </span>
                                    <div className={classes.rating}>
                                        <RatingStars rating={listItem.rating} />
                                    </div>
                                    <p>
                                        {listItem.description}
                                    </p>
                                    <span className={classes.price}>{listItem.price} VND</span>
                                </div>
                                </div>
                                <div className={classes['des-icon']}>
                                <div className={classes['icon-add']}
                                    onClick={() => handleAddToCart(listItem.id_item)}
                                >
                                  <ShoppingBasketIcon></ShoppingBasketIcon>
                                </div>
                                </div>
                                </div>
                            </div>
                            )
                        })}
                    
                    
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ListItem;