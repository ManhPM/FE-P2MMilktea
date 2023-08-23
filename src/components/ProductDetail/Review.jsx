import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import StarIcon from '@mui/icons-material/Star';
import { useParams } from "react-router-dom";
import CommentIcon from '@mui/icons-material/Comment';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import api from '../../apiRequest/axios';

const Review = () => {
    const {id_item} = useParams();
    const [reviews,setReviews] = useState([])

    useEffect(() => {
        async function getReviews(){
          const res = await api.get(`/reviews/${id_item}`)
          return res
        }
        getReviews().then((res) => {
          setReviews(res.data.itemList)
        })
        getReviews().catch((err) => {
          console.log(err)
        })
    },[id_item])

    function Rating(e) {
        const rating = e.value
        //console.log(order)
        if(rating === 5){
            return(    
                <>
                    <StarIcon className="text-warning"></StarIcon>
                    <StarIcon className="text-warning"></StarIcon>
                    <StarIcon className="text-warning"></StarIcon>
                    <StarIcon className="text-warning"></StarIcon>
                    <StarIcon className="text-warning"></StarIcon> 
                </>
            )
        }
        if(rating === 4){
            return(    
                <>
                    <StarIcon className="text-warning"></StarIcon>
                    <StarIcon className="text-warning"></StarIcon>
                    <StarIcon className="text-warning"></StarIcon>
                    <StarIcon className="text-warning"></StarIcon>
                    <StarIcon></StarIcon> 
                </>
            )
        }
        if(rating === 3){
            return(    
                <>
                    <StarIcon className="text-warning"></StarIcon>
                    <StarIcon className="text-warning"></StarIcon>
                    <StarIcon className="text-warning"></StarIcon>
                    <StarIcon></StarIcon>
                    <StarIcon></StarIcon> 
                </>
            )
        }
        if(rating === 2){
            return(    
                <>
                    <StarIcon className="text-warning"></StarIcon>
                    <StarIcon className="text-warning"></StarIcon>
                    <StarIcon></StarIcon>
                    <StarIcon></StarIcon>
                    <StarIcon></StarIcon> 
                </>
            )
        }
        if(rating === 1){
            return(    
                <>
                    <StarIcon className="text-warning"></StarIcon>
                    <StarIcon></StarIcon>
                    <StarIcon></StarIcon>
                    <StarIcon></StarIcon>
                    <StarIcon></StarIcon> 
                </>
            )
        }
    }

    return(
        <div style={{width: "50%",marginLeft: "35%"}} className="review">
            <div className="row">
                <div className="col-md-8 course-details-content">
                <div className="course-details-card mt--40">
                    <div className="course-content">
                    <div className="comment-wrapper pt--40">
                        <div className="section-title">
                        </div>
                        {reviews.map((item) => {
                            return(
                                <div className="edu-comment">
                                <div className="thumbnail mt-2">
                                    <img src={item.image} width={"50px"} height={"50px"} alt="Comment Images" />
                                </div>
                                <div className="comment-content mb-3">
                                    <div className="comment-top">
                                    <div className="rating">
                                    <Rating value={item.rating}/><br></br>
                                    </div>
                                    </div>
                                    <p style={{ marginTop: "4px"}} className="subtitle"><CommentIcon></CommentIcon> “{item.comment}”</p>
                                    <p><p style={{color: "#808080", marginTop: "4px"}}><AccessAlarmIcon style={{color: "#000000", marginBottom: "4px"}}></AccessAlarmIcon> {item.datetime}</p></p>
                                </div>
                                </div>
                            )
                        })}
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
    )
}

export default Review;