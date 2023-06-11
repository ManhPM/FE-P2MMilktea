import {React} from 'react';
import classes from './WishListItiem.module.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddButton from '../UI/Button/AddButton';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom'
import { useState,useEffect } from 'react';
import api from '../../apiRequest/axios'
//import "bootstrap/dist/css/bootstrap.min.css";



const Listitiem = [
    {
        id: "f007",
        name: "Iced Tea",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/13-1-600x600.png",
        date: "2020-08-13"
      },
      {
        id: "f008",
        name: "Burger",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/13-1-600x600.png",
        date: "2020-08-13"
      },
      {
        id: "f009",
        name: "Burger",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/13-1-600x600.png",
        date: "2020-08-13"
      },
      {
        id: "f0010",
        name: "Nước ép dâu",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1-600x600.png",
        date: "2020-08-13"
      },
      {
        id: "f0011",
        name: "Nước ép dâu",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1-600x600.png",
        date: "2020-08-13"
      },
      {
        id: "f0012",
        name: "Nước ép dâu",
        ingredients: "Nguyên liệu sản phẩm",
        price: 30000,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1-600x600.png",
        date: "2020-08-13"
      },
]


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
    })
    .catch(function (res) {
        console.log(res)
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
        </div>
    )
};

export default WishListItiem