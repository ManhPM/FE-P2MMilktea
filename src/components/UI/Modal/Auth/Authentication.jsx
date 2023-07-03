import { useFormik } from "formik";
import { useState, useEffect, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink,useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { Fragment } from "react";
import api from '../../../../apiRequest/axios'
import AuthContext from "../../../../apiRequest/Authprovider";
import classes from "./Authentication.module.css";
import LabledInput from "../../Input/LabledInput";
import Button from "../../Button/index";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";



const validateLogin = (values) => {
  const errors = {};

  if (!values.username || values.username.trim().length === 0) {
    errors.username = "Xin hãy nhập username của bạn !"; }
  // } else if (!/^[A-Za-z]+$/.test(values.username)) {
  //   errors.username = "Tên không hợp lệ !";
  // }

  if (!values.password || values.password.trim().length === 0) {
    errors.password = "Xin hãy nhập mật khẩu !"; }
  // } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
  //   errors.password = "Mật khẩu không hợp lệ !";
  // }

  return errors;
};

const LoginForm = (props) => {
  const {auth,setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  const [success,setSuccess] = useState(false);
  const [errors,setError] = useState("");
  
  

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: (values, { resetForm }) => {
      resetForm();
      console.log(values);
      handlesubmit(values);
    },
  });

  const handlesubmit = async(values) => {
    try{
        const res = await api.post("/account/login",values);
        console.log(res)
        navigate("/menu")
        setSuccess(true)
        const name = res.data.userInfo.name
        const id_customer = res.data.userInfo.id_customer
        const email = res.data.userInfo.email
        const phone = res.data.userInfo.phone
        const address = res.data.userInfo.address
        const id_account = res.data.userInfo.id_account
        setAuth({name,id_customer,phone,address,id_account,email})
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('timeOut',res.data.expireTime)   
    }
    catch(err){
        console.log(err)
        setError("Sai thông tin đăng nhập")
    } 
}
    

  return (
    <form onSubmit={formikLogin.handleSubmit}>
      <p className={classes["errors__login"]}>{errors}</p>
      <LabledInput
         name="username"
         label="username"
         placeholder="Nhập username"
         required={true}
         value={formikLogin.values.username}
         onChange={formikLogin.handleChange}
         onBlur={formikLogin.handleBlur}
         error={
          formikLogin.touched.username && formikLogin.errors.username
            ? formikLogin.errors.username
            : null
         }
      />
      <LabledInput
        name="password"
        label="Mật khẩu"
        placeholder="Nhập 8 kí tự có ít nhất 1 chữ cái viết hoa và 1 số"
        required={true}
        type="password"
        value={formikLogin.values.password}
        onChange={formikLogin.handleChange}
        onBlur={formikLogin.handleBlur}
        error={
          formikLogin.touched.password && formikLogin.errors.password
            ? formikLogin.errors.password
            : null
        }
      />
      <div className={classes.switch}>
        <p>Không có tài khoản ? Chuyển sang Đăng ký</p>
        <NavLink to="/register" onClick={props.onClose}>
          <Button>
            <KeyboardDoubleArrowRightIcon />
          </Button>
        </NavLink>
      </div>
      <Button type="submit">Đăng Nhập</Button>
    </form>
  );
};






const Authentication = (props) => {
  const authClasses = `${classes[`${props.className}`]} ${
    classes["auth-wrapper"]
  }`;

  return (
    <Fragment>
      {ReactDOM.createPortal(
         <div className={authClasses}>
          <div className={classes.wrapper}>
            <header className="my-3 d-flex justify-content-between">
              <h1 className={classes["form-header"]}>Đăng nhập</h1>
              {/* <p>Sai thông tin đăng nhập</p> */}
              <button onClick={props.onClose} className={classes.close}>
                <CloseIcon />
              </button>
           </header>
           <LoginForm onClose={props.onClose} />
          </div>
         </div>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Authentication;
