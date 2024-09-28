import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import deletefrombag from "../helper/deleteBagProduct";
import summaryApi from "../comman";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BagItem=({item,fetchbagproduct})=>{
  
  const dispatch=useDispatch();

  console.log("item id bag",item._id)
 
  const handleremove=(e)=>{
    deletefrombag(e,item,dispatch);
    fetchbagproduct();
  }
  const increasequantity=async(id,qty)=>{
    const response=await fetch(summaryApi.bagQuantity.url,{
      method:summaryApi.bagQuantity.method,
      credentials:'include',
      headers:{"content-type":"application/json"},
      body:JSON.stringify({
        quantity:qty+1,
        productId:id,
      })
      
    })
    const responseData= await response.json();
    if(responseData.success){
      
     
      fetchbagproduct();
      
      
      dispatch(bagActions.updateQuantity({ productId: id, quantity: qty + 1 }));
     
    }
    if(responseData.error){

      toast.success(responseData.message)
    }
   
  }
  const bagdata=useSelector(store=>store.bag);
console.log("bagggg data",bagdata)

const decreasequantity=async(id,qty)=>{
  const response=await fetch(summaryApi.bagQuantity.url,{
    method:summaryApi.bagQuantity.method,
    credentials:'include',
    headers:{"content-type":"application/json"},
    body:JSON.stringify({
      quantity:qty-1,
      productId:id,
    })
    
  })
  const responseData= await response.json();
  if(responseData.success){
    fetchbagproduct(); 
    dispatch(bagActions.updateQuantity({ productId: id, quantity: qty - 1 }));
   
  } 
}

  const currentPrice=(item.originalPrice)-(item.originalPrice/100)*(item.discountPercentage)
  return <>
 
  <div className="bag-item-container">
    <div className="item-left-part">
      <img className="bag-item-img" src={item.image}/>
    </div>
    <div className="item-right-part">
      <div className="company">{item.company}</div>
      <div className="item-name">{item.name}</div>
      <div className="price-container">
        <span className="current-price">Rs {Math.round(currentPrice)}</span>
        <span className="original-price">Rs {item.originalPrice}</span>
        <span className="discount-percentage">({item.discountPercentage}% OFF)</span>
      </div>
      <div className="return-period">
        <span className="return-period-days"> {item.return_period} days</span> return available
      </div>
      <div className="delivery-details">
        Delivery by
        <span className="delivery-details-days">{item.delivery_date}</span>
      </div>

      <div className="quantity-controller">
          <button onClick={()=>decreasequantity(item._id,item.quantity)} className="quantity-btn">-</button>
          <span className="quantity">{item.quantity}</span>
          <button onClick={()=>increasequantity(item._id,item.quantity)} className="quantity-btn">+</button>
        </div>
        
    </div>

    <div className="remove-from-cart" onClick={handleremove}>X</div>
  </div>
  
  
  </>
}

export default BagItem;