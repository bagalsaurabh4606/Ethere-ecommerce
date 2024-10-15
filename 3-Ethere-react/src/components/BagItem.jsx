import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import deletefrombag from "../helper/deleteBagProduct";
import summaryApi from "../comman";
import { toast } from "react-toastify";
import styles from "../styles/BagItem.module.css"; // Importing the CSS module

const BagItem = ({ item, fetchbagproduct }) => {
  const dispatch = useDispatch();

  const handleremove = (e) => {
    deletefrombag(e, item, dispatch);
    fetchbagproduct();
  };

  const increasequantity = async (id, qty) => {
    const quant = qty + 1;
    dispatch(bagActions.updateQuantity({ productId: id, quantity: quant }));

    const response = await fetch(summaryApi.bagQuantity.url, {
      method: summaryApi.bagQuantity.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        quantity: quant,
        productId: id,
      }),
    });

    const responseData = await response.json();
    if (responseData.error) {
      toast.error(responseData.message);
    }
  };

  const bagdata = useSelector((store) => store.bag);

  const decreasequantity = async (id, qty) => {
    if (qty === 1) {
      return;
    }
    const NewQuant = qty - 1;
    dispatch(bagActions.updateQuantity({ productId: id, quantity: NewQuant }));

    const response = await fetch(summaryApi.bagQuantity.url, {
      method: summaryApi.bagQuantity.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        quantity: NewQuant,
        productId: id,
      }),
    });

    const responseData = await response.json();
    if (responseData.error) {
      toast.error(responseData.message);
    }
  };

  const currentPrice =
    item.originalPrice - (item.originalPrice / 100) * item.discountPercentage;

  return (
    <div className={styles.bagItemContainer}>
      <div className={styles.itemLeftPart}>
        <img className={styles.bagItemImg} src={item.image} alt={item.name} />
      </div>
      <div className={styles.itemRightPart}>
      <div className={styles.itemName}>{item.name}</div>
        <div className={styles.company}>{item.description}</div>
       
        <div className={styles.priceContainer}>
          <span className={styles.currentPrice}>Rs {Math.round(currentPrice)}</span>
          <span className={styles.originalPrice}>Rs {item.originalPrice}</span>
          <span className={styles.discountPercentage}>
            ({item.discountPercentage}% OFF)
          </span>
        </div>
        <div className={styles.returnPeriod}>
          <span className={styles.returnPeriodDays}>
            {item.return_period} 14 days
          </span>{" "}
          return available
        </div>
        {/* <div className={styles.deliveryDetails}>
          Delivery by
          <span className={styles.deliveryDetailsDays}>{item.delivery_date}</span>
        </div> */}
        <div className={styles.quantityController}>
          <button
            onClick={() => decreasequantity(item.id, item.quantity)}
            className={styles.quantityBtn}
          >
            -
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button
            onClick={() => increasequantity(item.id, item.quantity)}
            className={styles.quantityBtn}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.removeFromCart} onClick={handleremove}>
        X
      </div>
    </div>
  );
};

export default BagItem;
