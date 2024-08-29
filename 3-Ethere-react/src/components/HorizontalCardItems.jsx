import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { IoBag } from "react-icons/io5";
import { wishlistActions } from "../store/wishlistSlice";
import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { FcLikePlaceholder } from "react-icons/fc";
import { useEffect, useState } from "react";
import addTocart from "../helper/addTocart";
import addTobag from "../helper/addTobag";

const HorizontalCardItems = ({ item }) => {
  const dispatch = useDispatch();
  const wishlistitem = useSelector((state) => state.wishlist);
  const bagItem = useSelector((state) => state.bag);

  //wishlist
  const wishlistelementfound = wishlistitem.some(
    (i) => i.productId === item.id.toString()
  );

  const [isInWishlist, setisInWishlist] = useState(wishlistelementfound);
  useEffect(() => {
    setisInWishlist(wishlistelementfound);
  }, [wishlistelementfound]);

  //bag

  const bagItemelement = bagItem.flat();
  const bagitemelementfound = bagItemelement.some(
    (bagItem) => bagItem.productId === item.id.toString()
  );

  const [isInBag, setIsinBag] = useState(bagitemelementfound);
  useEffect(() => {
    setIsinBag(bagitemelementfound);
  }, [bagitemelementfound]);

  const handleAddToBag = (e) => {
    addTobag(e, item, dispatch);
    setIsinBag(true);
  };

  const handleRemoveFromBag = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  const handleAddToWishlist = (e) => {
    addTocart(e, item, dispatch);
    setisInWishlist(true);
  };

  const handleRemoveFromWishlist = () => {
    dispatch(wishlistActions.removeFromWishlist(item.id));
  };
  const curr_price =
    item.originalPrice - (item.originalPrice / 100) * item.discountPercentage;

  return (
    <div className="horizontal-item-container">
      <div className="horizontal-image-container">
        <img
          className="horizontal-item-image"
          src={item.image}
          alt="item image"
        />
      </div>
      <div className="horizontal-details-container">
        <div className="horizontal-company-name">{item.name}</div>
        <div className="horizontal-price">
          <span className="horizontal-current-price">
            Rs {Math.round(curr_price)}
          </span>
          <span className="horizontal-original-price">
            Rs {item.originalPrice}
          </span>
          <span className="horizontal-discount">
            ({item.discountPercentage}% OFF)
          </span>
        </div>
        <div className="horizontal-rating-container">
          <div className="horizontal-rating">4.5|1400</div>
          <div className="horizontal-wishlist-buttons">
            {isInWishlist ? (
              <div
                className="horizontal-like"
                onClick={handleRemoveFromWishlist}
              >
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
    </div>
  );
};

export default HorizontalCardItems;
