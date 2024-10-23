import { Link } from "react-router-dom";
import styles from "../styles/PaymentSuccessful.module.css"; // Importing CSS module
import summaryApi from "../comman";
import { bagActions } from "../store/bagSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const PaymentSuccessful = () => {

  const currentUser = useSelector((store) => store.user.data);
  const isUserLoggedIn = currentUser && Object.keys(currentUser).length > 0;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBagProduct = async () => {
      const response = await fetch(summaryApi.getBagproducts.url, {
        method: summaryApi.getBagproducts.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        dispatch(bagActions.addToBag(responseData.data));
      }
    };

    if (isUserLoggedIn) {
      fetchBagProduct();
    } else {
      dispatch(bagActions.addToBag([]));
    }
  }, []);

  return (
    <div className={styles.paymentSuccessWrapper}>
      <div className={styles.paymentCircle}>
        <div className={styles.paymentCheckmark}>✔️</div>
      </div>
      <h1 className={styles.paymentSuccessHeading}>Order Confirmed</h1>
      <p className={styles.paymentSuccessMessage}>
        Thank you for your purchase! Your payment has been processed successfully.
      </p>
      <Link to="/profile">
        <button type="button" className={styles.paymentProfileBtn}>
          Track Order
        </button>
      </Link>
    </div>
  );
};

export default PaymentSuccessful;
