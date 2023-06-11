import React from "react";
import classes from './CheckOut.module.css'
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ItiemCheckOut from "./ItiemCheckOut";

const CheckOut = () => {
    return (
        <div>
            <div className={classes['main-content']}>
                <div style={{margin:'auto'}}>
                <h1 className='display-5  text-center align-baseline'>Thanh Toán</h1>
                <p className="text-center "><Link to='/' style={{color:'var(--grey-dark)'}}>Home</Link><ChevronRightIcon/>Thanh Toán</p>
                </div>
            </div>
            <ItiemCheckOut/>
        </div>
    )
}

export default CheckOut