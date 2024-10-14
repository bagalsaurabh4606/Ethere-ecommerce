import { Link } from "react-router-dom";
import styles from "../styles/PaymentSuccessful.module.css"; // Importing CSS module

const PaymentSuccessful = () => {
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
