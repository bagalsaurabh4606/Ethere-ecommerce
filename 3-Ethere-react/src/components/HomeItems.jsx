import { FcLike } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { wishlistActions } from "../store/wishlistSlice";
import { FcLikePlaceholder } from "react-icons/fc";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { IoBag } from "react-icons/io5";
import addTocart from "../helper/addTocart";
import { useEffect, useState } from "react";
import summaryApi from "../comman";
import addTobag from "../helper/addTobag";
import deletefrombag from "../helper/deleteBagProduct";
import deleteCartProduct from "../helper/deleteCartProduct";

const HomeItems = ({ item }) => {
  const dispatch = useDispatch();
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
  const curr_price =
    item.originalPrice - (item.originalPrice / 100) * item.discountPercentage;

  return (
    <div className="item-container">
      <img className="item-image" src={item.image} alt="item image" />
      <div className="rating_container">
        <div className="rating">
          {/* {" "}
          {item.rating.stars} ⭐ | {item.rating.count}{" "} */}
        </div>

        <div className="wishlist-icon">
          {isInWishlist ? (
            <div className="like" onClick={handleRemoveFromWishlist}>
              <FcLike />
            </div>
          ) : (
            <div className="like" onClick={handleAddToWishlist}>
              <FcLikePlaceholder />
            </div>
          )}
        </div>
      </div>
      <div className="company-name">{item.name}</div>
      <div className="item-name">{item.description}</div>
      <div className="price">
        <span className="current-price">Rs {Math.round(curr_price)}</span>
        <span className="original-price">Rs {item.originalPrice}</span>
        <span className="discount">({item.discountPercentage} % OFF)</span>
      </div>

      {!isInBag ? (
        <button className="btn-add-bag" onClick={handleAddToBag}>
          Add to Bag <IoBag />
        </button>
      ) : (
        <div className="tow-buttons-container">
          <Link to={"/bag"} className="bag-link">
            <button className="buy-now-button">
              Buy Now <IoBag />
            </button>
          </Link>
          <button className="remove-button" onClick={handleRemoveFromBag}>
            <RiDeleteBin4Fill />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeItems;
