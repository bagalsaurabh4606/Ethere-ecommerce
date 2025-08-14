import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { IoBag } from "react-icons/io5";
import { wishlistActions } from "../store/wishlistSlice";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import addTocart from "../helper/addTocart";
import addTobag from "../helper/addTobag";
import deletefrombag from "../helper/deleteBagProduct";
import deleteCartProduct from "../helper/deleteCartProduct";
import styles from "../styles/HorizontalCardItems.module.css";

const HorizontalCardItems = ({ item }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const currentUser = useSelector((store) => store.user.data);
  const isUserLoggedIn = currentUser && Object.keys(currentUser).length > 0;
  const wishlistitem = useSelector((state) => state.wishlist.wishProducts);
  const bagItem = useSelector((store) => store.bag.bagProducts);

  const wishlistelementfound = wishlistitem.some(
    (wishID) => wishID.id === item.id
  );
  const [isInWishlist, setisInWishlist] = useState(wishlistelementfound);
  useEffect(() => {
    setisInWishlist(wishlistelementfound);
  }, [wishlistelementfound]);

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
  const handleProductPageOpen=(e)=>{
    console.log("clickedddddddddd")
    let productId=item.id;
    navigate(`/product_hower/${productId}`)
  }
  
  const curr_price = item.originalPrice - (item.originalPrice / 100) * item.discountPercentage;

  return (
    <div className={styles.horizontalItemContainer}>
      <div className={styles.horizontalImageContainer}>
        <img
          className={styles.horizontalItemImage}
          src={item.image[0]}
          alt="item image"
          onClick={handleProductPageOpen}
        />
      </div>
      <div className={styles.horizontalDetailsContainer}>
        <div> <div className={styles.horizontalCompanyName}>{item.name}</div>
        <div className={styles.horizontalDiscription}>{item.description}</div></div>
        <div className={styles.horizontalPrice}>
          <span className={styles.horizontalCurrentPrice}>
            Rs {Math.round(curr_price)}
          </span>
          <span className={styles.horizontalOriginalPrice}>
            Rs {item.originalPrice}
          </span>
          <span className={styles.horizontalDiscount}>
            ({item.discountPercentage}% OFF)
          </span>
        </div>
        <div className={styles.horizontalRatingContainer}>
          <div className={styles.horizontalRating}>4.5 | 1400</div>
          <div className="horizontal-wishlist-buttons">
            {isInWishlist ? (
              <div className={styles.horizontalLike} onClick={handleRemoveFromWishlist}>
                <FcLike />
              </div>
            ) : (
              <div className="horizontal-like" onClick={handleAddToWishlist}>
                <FcLikePlaceholder />{" "}
              </div>
            )}
          </div>
        </div>
        {!isInBag ? (
          <button className={styles.btnAddBag} onClick={handleAddToBag}>
            Add to Bag <IoBag />
          </button>
        ) : (
          <div className={styles.twoButtonsContainer}>
            <Link to={"/bag"} className={styles.bagLink}>
              <button className={styles.buyNowButton}>
                Buy Now <IoBag />
              </button>
            </Link>
            <button
              className={styles.removeButton}
              onClick={handleRemoveFromBag}
            >
              <RiDeleteBin4Fill />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HorizontalCardItems;
