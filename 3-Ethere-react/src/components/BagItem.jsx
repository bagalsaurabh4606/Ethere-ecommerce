import { useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";

const BagItem=({item})=>{
  
  const dispatch=useDispatch();
  const handleremove=()=>{
    console.log("remove");
     dispatch(bagActions.removeFromBag(item.id));
  }
  return <>
 
  <div className="bag-item-container">
    <div className="item-left-part">
      <img className="bag-item-img" src={item.image}/>
    </div>
    <div className="item-right-part">
      <div className="company">{item.company}</div>
      <div className="item-name">{item.name}</div>
      <div className="price-container">
        <span className="current-price">Rs {item.currentPrice}</span>
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

    <div className="remove-from-cart" onClick={handleremove}>X</div>
  </div>
  
  
  </>
}

export default BagItem;