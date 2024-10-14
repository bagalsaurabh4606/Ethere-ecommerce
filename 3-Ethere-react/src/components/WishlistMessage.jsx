import { Link } from "react-router-dom";
import styles from "../styles/WishlistMessage.module.css"; // Adjust the path as necessary

const WishlistMessage = () => {
  return (
    <div className={styles.emptyCart}>
      <div className={styles.cardContent}>
        <h2>Add your favorite items here</h2>
        <img
          className={styles.emptyWishlistImage}
          src="images/forWhislist" // Ensure this path is correct
          alt="Myntra Home"
        />
        <Link to="/" className={styles.emptyButtonContainer} style={{ color: 'inherit', textDecoration: 'none' }}>
          <button type="button" className="btn btn-outline-info">
            Add items to favorites
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WishlistMessage;
