import {React, useState} from 'react';
import { useFormik } from "formik";
import api from '../apiRequest/axios';
import { useNavigate } from 'react-router-dom';
//import CloseIcon from "@mui/icons-material/Close";
//import { NavLink } from "react-router-dom";
//import { Fragment } from "react";
import LabledInput from "../components/UI/Input/LabledInput"
import Button from "../components/UI/Button/SmallButton"
import {ToastContainer, toast} from "react-toastify"

const validateLogin = (values) => {
    const errors = {};
  
    if (!values.email || values.email.trim().length === 0) {
      errors.email = "Xin hãy nhập email !";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Email không hợp lệ !";
    }
    if (!values.username || values.username.trim().length === 0) {
        errors.username = "Xin hãy nhập username của bạn !";
    }
  
    return errors;
};


const Forgotpassword = () => {
    const navigate = useNavigate();

    const handlesubmit = (values) => {
      api.post(`/account/forgotpassword`,values)
      .then(function (res) {
        toast.success('Mật khẩu mới đã được gửi qua email. Vui lòng kiểm tra hòm thư!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      setTimeout(() => {
          navigate('/')
      }, 5000);
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
          theme: "colored",
          });
        })
    }
    const formikRegister = useFormik({
        initialValues: {
          username: "",
          password: "",
      
        },
        validate: validateLogin,
        onSubmit: values => {
            handlesubmit(values)
        }
      });
    //console.log(username);
    return (
      
    <div>
      <div className="container " style={{marginTop:"100px"}}> 
      <div>
        <h1 className='display-6 mark text-center'>Quên mật khẩu</h1>
      </div>
      <form onSubmit={formikRegister.handleSubmit}> 
        <LabledInput
         name="username"
         label="username"
         placeholder="Nhập username"
         required={true}
         value={formikRegister.values.username}
         onChange={formikRegister.handleChange}
         onBlur={formikRegister.handleBlur}
         error={
            formikRegister.touched.username && formikRegister.errors.username
            ? formikRegister.errors.username
            : null
         }
        />
        <LabledInput
        name="email"
        label="Email"
        placeholder="Nhập Email"
        required={true}
        value={formikRegister.values.email}
        onChange={formikRegister.handleChange}
        onBlur={formikRegister.handleBlur}
        error={
            formikRegister.touched.email && formikRegister.errors.email
            ? formikRegister.errors.email
            : null
        }
      />
      <Button type="submit">Xác nhận</Button>
     </form> 
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
};

export default Forgotpassword;