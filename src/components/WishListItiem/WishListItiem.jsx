import {React} from 'react';
import classes from './WishListItiem.module.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddButton from '../UI/Button/AddButton';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom'
import { useState,useEffect } from 'react';
import api from '../../apiRequest/axios'
//import "bootstrap/dist/css/bootstrap.min.css";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';



const WishListItiem = () => {
    const token = localStorage.getItem('token')
    const quantity = {quantity: 1}
    const [wishLists,setWishLists] = useState([])

  const getData = async() => {
    const res = await api.get("/wishlist",{
      headers:{
        access_token: token
      }
    })
    return res
  }
  useEffect(() => {
    
      getData().then((res) => {
        setWishLists(res.data)
        
      })
      getData().catch((err) => {
        console.log(err)
      })
  },[])
  console.log(wishLists.length)
  const handleAddToCart = async (id_item) => {
    api.post(`cart/add/${id_item}`,quantity,
    {
        headers: {
            access_token: token
        }
    })
    .then(function (res) {
        console.log(res)
        toast.success('Thêm vào giỏ hàng thành công', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      }); 
    })
    .catch(function (res) {
        console.log(res)
        toast.warn('Thao tác thất bại', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
    });
  }


    return(
        <div>
            <div className={classes['main-content']}>
                <div style={{margin:'auto'}}>
                <h1 className='display-5  text-center align-baseline'>WishList</h1>
                <p className="text-center "><Link to='/' style={{color:'var(--grey-dark)'}}>Home</Link><ChevronRightIcon/>WishList</p>
                </div>
            </div>
            <div className='container'>
                <Table  //</div>className='table table-striped table-bordered table-hover align-middle'
                    striped bordered hover
                    style={{marginBottom:'6rem'}}
                > 
                    <tbody>
                        {wishLists.map((wishList =>{
                            return (
                                <tr key={wishList.id_item}>
                                    <td className={classes['column-image']}><Link to="/"><img src={wishList.image} alt="food image" width="90px" height="90px"></img></Link></td>
                                    <td className={classes['column-des']}>
                                        <div><Link className={classes['name-itiem']} to="/">{wishList.name}</Link></div>
                                        <div>Giá: {wishList.price}</div>
                                        <div>20-11-2021</div>
                                    </td>
                                    <td className='align-middle'>
                                        <AddButton onClick={() => handleAddToCart(wishList.id_item)}>Add To Card</AddButton>
                                    </td>
                                </tr>
                            )
                        }))}
                    </tbody>
                </Table>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
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

export default WishListItiem