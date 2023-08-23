/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import KeyIcon from "@mui/icons-material/ModeEdit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import classes from "./Profile.module.css";
import api from "../../apiRequest/axios";

const Profile = () => {
  // const handleSelectFile = (e) => setFile(e.target.files[0]);
  const token = localStorage.getItem("token");
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const handleUpload = async (e) => {
    try {
    const my_file = e.target.files[0];
      const res = await axios.post(
        "https://p2mmilktea.onrender.com/upload",
        {
            my_file
        },
        {
          headers: {
            Access_token: token,
            'Content-Type': 'multipart/form-data'
          },
        }
      );
      toast.success(`${res.data.message}`, {
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
        navigate("/profile");
      }, 2000);
      getInfo();
      getInfo().then((res) => {
        setInfo(res.data.userInfo);
      });
    } catch (error) {
      toast.error(`${error.message}`, {
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
        navigate("/profile");
      }, 2000);
    } finally {
    }
  };

  // console.log(auth)

  const getInfo = async () => {
    const res = await api.get("/account/profile", {
      headers: {
        access_token: token,
      },
    });
    return res;
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    getInfo().then((res) => {
      setInfo(res.data.userInfo);
      // console.log(res)
    });
    getInfo().catch((err) => {
      console.log(err);
    });
  }, []);

  // console.log(info)
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      api
        .put(
          `account/updateprofile`,
          {
            name: info.name,
            phone: info.phone,
            address: info.address,
          },
          {
            headers: {
              Access_token: token,
            },
          }
        )
        .then((res) => {
          toast.success("Cập nhập thông tin thành công", {
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
            navigate("/profile");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Thao tác thất bại", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setInfo((info) => ({
      ...info,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="container">
      <div className={classes["main-body"]}>
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className={classes["card"]}>
              <div className={classes["card-body"]}>
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={info.image}
                    alt="Ảnh đại diện"
                    className="rounded-circle"
                    width={150}
                  />
                  <div className="mt-3">
                    <AccountCircleIcon></AccountCircleIcon>
                    <h2>{info.name}</h2>
                    <br></br>
                    <EmojiEmotionsIcon></EmojiEmotionsIcon>
                    <p className="text-secondary mb-1">Khách hàng</p>
                    <br></br>
                    <HomeIcon></HomeIcon>
                    <p className="text-muted font-size-sm">{info.address}</p>
                    <br></br>
                    <button className="btn btn-outline-primary">
                      <ImageIcon></ImageIcon>
                      <label htmlFor="file">
                        Cập nhật ảnh đại diện
                        <input
                          onChange={async (e) => await handleUpload(e)}
                          multiple={false}
                          hidden
                          className={classes["custom-file-input"]}
                          type="file"
                          id="file"
                        />
                      </label>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className={classes["card-body"]}>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">
                      <AccountCircleIcon></AccountCircleIcon> Họ và tên
                    </h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      name="name"
                      value={info.name}
                      style={{ width: "500px" }}
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">
                      <MailIcon></MailIcon> Email
                    </h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      name="name"
                      value={info.email}
                      style={{ width: "500px" }}
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">
                      <SmartphoneIcon></SmartphoneIcon> Số điện thoại
                    </h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      name="name"
                      value={info.phone}
                      style={{ width: "500px" }}
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">
                      <HomeIcon></HomeIcon> Địa chỉ
                    </h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      name="name"
                      value={info.address}
                      type="text"
                      onChange={handleChange}
                      style={{ width: "500px" }}
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12">
                  <NavLink style={{color: "black"}} to="/changepassword">
                  <a className="btn btn-info">
                  <KeyIcon></KeyIcon>
                  Đổi mật khẩu
                    </a>
                    </NavLink>
                    <a className="btn btn-info ml-2" onClick={handleSubmit}>
                      <ModeEditIcon></ModeEditIcon>
                      Cập nhật thông tin
                    </a>
                    <a
                      href="/"
                      onClick={() => {
                        localStorage.clear();
                      }}
                      className="btn btn-info ml-2"
                    >
                      <LogoutIcon></LogoutIcon>
                      Đăng xuất
                    </a>
                  </div>
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
  );
};

export default Profile;
