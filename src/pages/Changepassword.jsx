import {React} from 'react';
import { useFormik } from "formik";
import api from '../apiRequest/axios';
import { useNavigate } from 'react-router-dom';
import LabledInput from "../components/UI/Input/LabledInput"
import Button from "../components/UI/Button/SmallButton"
import {ToastContainer, toast} from "react-toastify"

const validateLogin = (values) => {
    const errors = {};
    if (!values.oldPassword || values.oldPassword.trim().length === 0) {
        errors.oldPassword = "Xin hãy nhập mật khẩu cũ!";
    }
    if (!values.newPassword || values.newPassword.trim().length === 0) {
      errors.newPassword = "Xin hãy nhập mật khẩu mới!";
  }
    if (!values.repeatPassword || values.repeatPassword.trim().length === 0) {
        errors.repeatPassword = "Xin hãy nhập lặp lại mật khẩu mới!";
    }
    return errors;
};


const Changepassword = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    console.log(token)
    const handlesubmit = (data) => {
      api.put(`account/changepassworduser`, 
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          repeatPassword: data.repeatPassword
        },
        {
            headers: {
                Access_token: token,
            }
        }
    )
      .then(function (res) {
        toast.success('Đổi mật khẩu thành công!', {
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
          navigate('/menu')
      }, 3000);
      })
      .catch(function (res) {
        console.log(res)
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
          oldPassword: "",
          newPassword: "",
          repeatPassword: "",
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
        <h1 className='display-6 mark text-center'>Đổi mật khẩu</h1>
      </div>
      <form onSubmit={formikRegister.handleSubmit}> 
        <LabledInput
         name="oldPassword"
         label="Mật khẩu cũ"
         placeholder="Mật khẩu cũ"
         required={true}
         type="password"
         value={formikRegister.values.oldPassword}
         onChange={formikRegister.handleChange}
         onBlur={formikRegister.handleBlur}
         error={
            formikRegister.touched.oldPassword && formikRegister.errors.oldPassword
            ? formikRegister.errors.oldPassword
            : null
         }
        />
        <LabledInput
         name="newPassword"
         label="Mật khẩu mới"
         placeholder="Mật khẩu mới"
         required={true}
         type="password"
         value={formikRegister.values.newPassword}
         onChange={formikRegister.handleChange}
         onBlur={formikRegister.handleBlur}
         error={
            formikRegister.touched.newPassword && formikRegister.errors.newPassword
            ? formikRegister.errors.newPassword
            : null
         }
        />
        <LabledInput
         name="repeatPassword"
         label="Lặp lại mật khẩu mới"
         placeholder="Lặp lại mật khẩu mới"
         required={true}
         type="password"
         value={formikRegister.values.repeatPassword}
         onChange={formikRegister.handleChange}
         onBlur={formikRegister.handleBlur}
         error={
            formikRegister.touched.repeatPassword && formikRegister.errors.repeatPassword
            ? formikRegister.errors.repeatPassword
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

export default Changepassword;