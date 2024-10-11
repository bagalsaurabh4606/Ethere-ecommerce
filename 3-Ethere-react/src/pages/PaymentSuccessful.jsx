import { Link } from "react-router-dom";


const PaymentSuccessful = () => {
  return (
    <div className="payment-success-wrapper">
      <div className="payment-circle">
        <div className="payment-checkmark">✔️</div>
      </div>
      <h1 className="payment-success-heading">Order Confirmed</h1>
      <p className="payment-success-message">Thank you for your purchase! Your payment has been processed successfully.</p>
      <Link to="/profile">
        <button type="button" className="payment-profile-btn">Track Order</button>
      </Link>
    </div>
  );
};

export default PaymentSuccessful;
