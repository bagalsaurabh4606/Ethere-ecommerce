import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import summaryApi from "../comman";
import styles from "../styles/BagSummary.module.css"; // Updated import statement for CSS Module
import { toast } from "react-toastify";

const CONVENIENCE_FEES = 99;

const BagSummary = ({ FinalItems }) => {
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

  //const razor_key = import.meta.env.REACT_APP_RAZORPAY_KEY; // Replace with your actual Razorpay key
  const razor_key="rzp_test_UGFv4hwUbaNa0c";
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
    if(responseData.error){toast.error(responseData.message);}
    
    if (responseData?.orderId) {
      const razorpayOptions = {
        key: razor_key,
        amount: finalPayment * 100,
        currency: "INR",
        name: "Your Store",
        description: "Order Payment",
        order_id: responseData.orderId,
        handler: () => {
          navigate("/payment-success");
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
  let curruntprice = 0;

  FinalItems.forEach(bagItem => {
    totalMRP += bagItem.originalPrice * bagItem.quantity;
    curruntprice += (bagItem.originalPrice * bagItem.quantity) - (bagItem.originalPrice * bagItem.quantity / 100) * (bagItem.discountPercentage);
    totalDiscount += totalMRP - curruntprice;
  });

  let finalPayment = curruntprice;

  return (
    <>
      <div className={styles.bagDetailsContainer}>
        <div className={styles.priceHeader}>PRICE DETAILS ({totalItem} Items)</div>
        <div className={styles.priceItem}>
          <span className={styles.priceItemTag}>Total MRP</span>
          <span className={styles.priceItemValue}>₹{Math.round(totalMRP)}</span>
        </div>
        <div className={styles.priceItem}>
          <span className={styles.priceItemTag}>Discount on MRP</span>
          <span className={`${styles.priceItemValue} ${styles.priceDetailBaseDiscount}`}>
            -₹{Math.round(totalDiscount)}
          </span>
        </div>
        <hr />
        <div className={styles.priceFooter}>
          <span className={styles.priceItemTag}>Total Amount</span>
          <span className={styles.priceItemValue}>{Math.round(finalPayment)}</span>
        </div>
      </div>
      <button className={styles.btnPlaceOrder} onClick={handlePayment}>
        PLACE ORDER
      </button>
    </>
  );
};

export default BagSummary;
