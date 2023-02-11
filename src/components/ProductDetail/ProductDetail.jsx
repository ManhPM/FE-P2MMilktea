import {React} from 'react';
import classes from './ProductDetail.module.css'
import Index from '../UI/RatingStars/Index'
import {Link} from 'react-router-dom'
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook"
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import AddButton from '../UI/Button/AddButton';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import WishButton from '../UI/Button/WishButton';
import { useState } from 'react';
import Footer from '../UI/Footer';
import RawMaterialFood from './RawMaterialFood';






const ProductDetail = () => {
    const [value, setValue] = useState(1);
        const toggleTab = (index) => {
            setValue(index);
        }
    
    return (
        <section style={{marginTop:'4.75rem'}}>
            <div className='container' style={{marginTop:'200px'}}>
              <div className={classes['wrapper']}>
                <div className={classes['main-image']}>
                    <img src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/24-1.png" alt="Image" width="100%"></img>
                </div>
                <div className={classes['des-food']}>
                    <h1 className={classes['food-name']}>Iced Tea</h1>
                    <Index/>
                    <p>Browse unique Coca-Cola products, clothing, & accessories, or customize Coke bottles and gifts</p>
                    <h1 className={classes['price']}>Giá: 30000</h1>
                    <hr></hr>
                    <div className={classes['add-main']}>          
                        <button className={classes['button-add']}><ShoppingBasketIcon className={classes['icon-add']}></ShoppingBasketIcon>ADD TO CART</button> 
                        <div className={classes['wish-button']}>
                            <div className={classes['wish-icon']}>
                                <WishButton/>
                            </div>
                        </div>
                    </div>
                    <hr style={{marginBottom:'2.5rem'}}></hr>
                    <div className={classes['category-itiem']}>
                        <p>Category:  <Link className={classes['link-itiem']} to="/">Pasta</Link></p>
                        <p>Share: <tab/>  
                            <Link to="/"><FacebookIcon className={classes['icon-category']} color="disabled"/></Link>
                            <Link to="/"><YouTubeIcon className={classes['icon-category']} color="disabled"/></Link>
                            <Link to="/"><InstagramIcon className={classes['icon-category']} color="disabled"/></Link>
                            <Link to="/"><TwitterIcon className={classes['icon-category']} color="disabled"/></Link>
                        </p>
                    </div>
                    <hr style={{marginTop:'2rem',marginBottom:'2rem'}}></hr>
                    <ul className={classes['note-content']}>
                        <li>Free global shipping on all orders</li>
                        <li>30 days easy returns if you change your mind</li>
                        <li>Order before noon for same day dispatch</li>
                    </ul>
                    <hr style={{marginTop:'1.5rem',marginBottom:'2rem'}}></hr>
                    <div>
                    <h1 style={{color:'var(--text)',fontWeight:'700',marginRight:'2rem'}}>Guaranteed Safe Checkout
                        <img className={classes['image-pay']} src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/trust-symbols.png" alt="image-"></img>
                    </h1>           
                    </div>
                </div>
              </div>
              <div>
                   
                <div className={classes['button-review']}>
                            <button
                             className = {value===1 ? classes['button-active'] : classes['']}
                             onClick={()=> toggleTab(1) }
                            >
                                Description
                            </button>
                            <button
                            className = {value===2 ? classes['button-active'] : classes['']}
                            onClick={()=> toggleTab(2)}
                            >
                                Review
                            </button>
                </div> 
                <div
                    className = {value===1 ? classes['content-active'] : classes['content-none']}
                >
                    <RawMaterialFood/>
                </div>
                <div
                 className = {value===2 ? classes['content-active'] : classes['content-none']}
                >
                    <p>Review</p>
                </div>
              </div>
              
            </div>
            <Footer/>
            
        </section>
    );
}
export default ProductDetail;