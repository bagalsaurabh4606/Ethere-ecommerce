import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { IoBag } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { bagActions } from "../store/bagSlice";
import { wishlistActions } from "../store/wishlistSlice";
import addTocart from "../helper/addTocart";
import addTobag from "../helper/addTobag";
import deletefrombag from "../helper/deleteBagProduct";
import deleteCartProduct from "../helper/deleteCartProduct";
import styles from "../styles/HomeItems.module.css";

const HomeItems = ({ item }) => {
  console.log("image check",item)
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const currentUser = useSelector((store) => store.user.data);
  const isUserLoggedIn = currentUser && Object.keys(currentUser).length > 0;

  const wishlistitem = useSelector((state) => state.wishlist.wishProducts);
  const bagItem = useSelector((store) => store.bag.bagProducts);

  //wishlist
  const wishlistelementfound = wishlistitem.some(
    (wishID) => wishID.id === item.id
  );

  const [isInWishlist, setisInWishlist] = useState(wishlistelementfound);
  useEffect(() => {
    setisInWishlist(wishlistelementfound);
  }, [wishlistelementfound]);

  //bag
  const bagitemelementfound = bagItem.some((bagId) => bagId.id === item.id);

  const [isInBag, setIsinBag] = useState(false);
  useEffect(() => {
    setIsinBag(bagitemelementfound);
  }, [bagitemelementfound]);

  const handleAddToBag = (e) => {
    dispatch(bagActions.addToBag(item));
    addTobag(e, item, dispatch);

    setIsinBag(true);
  };

  const handleRemoveFromBag = (e) => {
    deletefrombag(e, item, dispatch);
    setIsinBag(false);
  };

  const handleAddToWishlist = (e) => {
    addTocart(e, item, dispatch);
    setisInWishlist(true);
  };

  const handleRemoveFromWishlist = (e) => {
    deleteCartProduct(e, item, dispatch);
    setisInWishlist(false);
  };
  const handleProductPageOpen = () => {

  let productId=item.id;
   navigate(`/product_hower/${productId}`)
 };


  const curr_price =
    item.originalPrice - (item.originalPrice / 100) * item.discountPercentage;

  return (
    <div className={styles.itemContainer}>
      <img
      className={styles.itemImage}
      src={item.image[0]}
      alt="item"
      onClick={handleProductPageOpen}
/>
      <div className={styles.ratingContainer}>
        <div className={styles.rating}>
          {/* Rating can be displayed here */}
        </div>
        <div className={styles.wishlistIcon}>
          {isInWishlist ? (
            <div className={styles.like} onClick={handleRemoveFromWishlist}>
              <FcLike />
            </div>
          ) : (
            <div className={styles.like} onClick={handleAddToWishlist}>
              <FcLikePlaceholder />
            </div>
          )}
        </div>
      </div>
      <div className={styles.companyName}>{item.name}</div>
      <div className={styles.itemName}>{item.description}</div>
      <div className={styles.price}>
        <span className={styles.currentPrice}>Rs {Math.round(curr_price)}</span>
        <span className={styles.originalPrice}>Rs {item.originalPrice}</span>
        <span className={styles.discount}>
          ({item.discountPercentage} % OFF)
        </span>
      </div>

      {!isInBag ? (
        <button className={styles.btnAddBag} onClick={handleAddToBag}>
          Add to Bag <IoBag />
        </button>
      ) : (
        <div className={styles.towButtonsContainer}>
          <Link to={"/bag"} className={styles.bagLink}>
            <button className={styles.buyNowButton}>
              Buy Now <IoBag />
            </button>
          </Link>
          <button className={styles.removeButton} onClick={handleRemoveFromBag}>
            <RiDeleteBin4Fill />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeItems;



