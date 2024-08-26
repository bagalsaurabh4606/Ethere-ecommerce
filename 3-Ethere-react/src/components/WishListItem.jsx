import { useDispatch } from "react-redux";
import { wishlistActions } from "../store/wishlistSlice";
import { FcLike } from "react-icons/fc";


const WishListItem=({item})=>{
const dispatch = useDispatch();
const handleremove=()=>
{
  dispatch(wishlistActions.removeFromWishlist(item.id));
}

console.log("for image",item)

return  <div className="bag-item-container">
<div className="item-left-part">
 <img className="bag-item-img" src={item.image}/>
</div> 
<div className="item-right-part">
  <div className="company">{item.category}</div>
  <div className="item-name">{item.name}</div>
  <div className="price-container">
    {/* <span className="current-price">Rs {item.current_price}</span> */}
    <span className="original-price">Rs {item.originalPrice}</span>
    <span className="discount-percentage">({item.discountPercentage}% OFF)</span>
  </div>
  <div className="return-period">
    <span className="return-period-days">{item.return_period} days</span> return available
  </div>
  <div className="delivery-details">
    Delivery by
    <span className="delivery-details-days">{item.delivery_date}</span>
  </div>
</div>

<div className="remove-from-cart" onClick={handleremove}><FcLike className="like"/></div>
</div>
}
export default WishListItem;