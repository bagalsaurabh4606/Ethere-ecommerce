import { useDispatch } from "react-redux";
import { FcLike } from "react-icons/fc";
import deleteCartProduct from "../helper/deleteCartProduct";
import styles from "../styles/WishListItem.module.css"; // Adjust the path as necessary

const WishListItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = (e) => {
    deleteCartProduct(e, item, dispatch);
  };

  return (
    <div className={styles.bagItemContainer}>
      <div className={styles.itemLeftPart}>
        <img className={styles.bagItemImg} src={item.image} alt={item.name} />
      </div>
      <div className={styles.itemRightPart}>
        <div className={styles.company}>{item.category}</div>
        <div className={styles.itemName}>{item.name}</div>
        <div className={styles.priceContainer}>
          <span className={styles.originalPrice}>Rs {item.originalPrice}</span>
          <span className={styles.discountPercentage}>({item.discountPercentage}% OFF)</span>
        </div>
        <div className={styles.returnPeriod}>
          <span className={styles.returnPeriodDays}>{item.return_period} days</span> return available
        </div>
        <div className={styles.deliveryDetails}>
          Delivery by <span className={styles.deliveryDetailsDays}>{item.delivery_date}</span>
        </div>
      </div>
      <div className={styles.removeFromCart} onClick={handleRemove}>
        <FcLike className={styles.like} />
      </div>
    </div>
  );
};

export default WishListItem;
