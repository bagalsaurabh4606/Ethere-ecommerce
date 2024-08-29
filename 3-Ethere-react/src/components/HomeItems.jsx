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

const HomeItems = ({ item, bagItem, wishlistitem }) => {
  const dispatch = useDispatch();
  const wishlistelementfound = wishlistitem.some(
    (i) => i.productId === item.id.toString()
  );
  const [isInWishlist, setisInWishlist] = useState(wishlistelementfound);
  useEffect(() => {
    setisInWishlist(wishlistelementfound);
  }, [wishlistelementfound]);

  const bagItemelement = bagItem.flat();
  const bagitemelementfound = bagItemelement.some(
    (bagItem) => bagItem.productId === item.id.toString()
  );

  const [isInBag, setIsinBag] = useState(bagitemelementfound);
  useEffect(() => {
    setIsinBag(bagitemelementfound);
  }, [bagitemelementfound]);

  const handleAddtoBag = (e) => {
    addTobag(e, item, dispatch);
    setIsinBag(true);
  };

  const handleremovetoBag = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };
  const wishlisthandle = (e) => {
    addTocart(e, item, dispatch);
    setisInWishlist(true);
  };
  const removeWishlist = () => {
    dispatch(wishlistActions.removeFromWishlist(item.id));
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
            <div className="like" onClick={removeWishlist}>
              <FcLike />
            </div>
          ) : (
            <div className="like" onClick={wishlisthandle}>
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
        <button className="btn-add-bag" onClick={handleAddtoBag}>
          Add to Bag <IoBag />
        </button>
      ) : (
        <div className="tow-buttons-container">
          <Link to={"/bag"} className="bag-link">
            <button className="buy-now-button">
              Buy Now <IoBag />
            </button>
          </Link>
          <button className="remove-button" onClick={handleremovetoBag}>
            <RiDeleteBin4Fill />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeItems;
