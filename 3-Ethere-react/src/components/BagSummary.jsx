import { useEffect } from "react";
import summaryApi from "../comman";
import { useSelector } from "react-redux";
import {loadStripe} from "@stripe/stripe-js"
import { useNavigate } from "react-router-dom";

const CONVENIENCE_FEES=99;
const BagSummary=({FinalItems})=>{

  const user = useSelector((store) => store?.user?.data);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
 const razor_key="rzp_test_lvvBTkLbGzAcVM"
 ///process.env.REACT_APP_RAZORPAY_KEY;
 console.log("key",razor_key)

  const handlePayment = async () => {
    const response = await fetch(summaryApi.payment.url, {
      method: summaryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(FinalItems),
    });
    
    const responseData = await response.json();
    console.log("user data got from razorpay",responseData)
    if (responseData?.orderId) {
      const razorpayOptions = {
        key: razor_key,
        amount: finalPayment * 100,
        currency: "INR",
        name: "Your Store",
        description: "Order Payment",
        order_id: responseData.orderId,
        handler: function (response) {
          navigate("/payment-success")
        },
        prefill: {
          email: user.email,
        },
      };

      const rzp1 = new window.Razorpay(razorpayOptions);
      rzp1.open();
    }
  };




  let totalItem = FinalItems.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let curruntprice=0;
  FinalItems.forEach(bagItem => {
    totalMRP += bagItem.originalPrice*bagItem.quantity;
    curruntprice+=(bagItem.originalPrice*bagItem.quantity)-(bagItem.originalPrice*bagItem.quantity/100)*(bagItem.discountPercentage)
    totalDiscount += totalMRP - curruntprice;
    
  });


  let finalPayment = curruntprice;

return (
<>

<div className="bag-details-container">
    <div className="price-header">PRICE DETAILS ({totalItem} Items) </div>
    <div className="price-item">
      <span className="price-item-tag">Total MRP</span>
      <span className="price-item-value">₹{Math.round(totalMRP)}</span>
    </div>
    <div className="price-item">
      <span className="price-item-tag">Discount on MRP</span>
      <span className="price-item-value priceDetail-base-discount">-₹{Math.round(totalDiscount)}</span>
    </div>
    {/* <div className="price-item">
      <span className="price-item-tag">Convenience Fee</span>
      <span className="price-item-value">₹99</span>
    </div> */}
    <hr/>
    <div className="price-footer">
      <span className="price-item-tag">Total Amount</span>
      <span className="price-item-value">{Math.round(finalPayment)}</span>
    </div>
  </div>
  <button className="btn-place-order">
    <div className="css-xjhrni" onClick={handlePayment}>PLACE ORDER</div>
  </button>
 
</>
  
);
}

export default BagSummary;