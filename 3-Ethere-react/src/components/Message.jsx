import { Link } from "react-router-dom";
import styles from "../styles/Message.module.css"; // Updated import for CSS Module

const Message = () => {
  return (
    <div className={styles.emptyCart}>
      <div className={styles.cardContent}>
        <h2>Your Cart is empty!</h2>
        <img
          className={styles.emptyCartImage}
          src="images/emptycartimage.png"
          alt="Myntra Home"
        />
        <Link
          to="/"
          className={styles.emptyButtonContainer}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <button type="button" className="btn btn-outline-info">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Message;

{/* <div className="Message">
<p>Bag is Empty</p>
<button type="button" class="btn btn-outline-info">Info</button>
</div> */}

// card-body