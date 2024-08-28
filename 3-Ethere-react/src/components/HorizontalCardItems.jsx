import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { IoBag } from "react-icons/io5";
import { wishlistActions } from "../store/wishlistSlice";
import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import { FcLikePlaceholder } from "react-icons/fc";

const HorizontalCardItems = ({item})=>
{
  

  const dispatch = useDispatch();

  const wishlistItems = useSelector((store) => store.wishlist);
  const bagItems = useSelector((store) => store.bag);

  const wishlistelementFound = wishlistItems.indexOf(item.id) >= 0;
  const bagelementFound = bagItems.indexOf(item.id) >= 0;

  const handleAddToBag = () => {
    dispatch(bagActions.addToBag(item.id));
  };

  const handleRemoveFromBag = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  const handleAddToWishlist = () => {
    dispatch(wishlistActions.addToWishlist(item.id));
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
                {wishlistelementFound ? (
                  <div
                    className="horizontal-like"
                    onClick={handleRemoveFromWishlist}
                  >
                    <FcLike />
                  </div>
                ) : (
                  <div
                    className="horizontal-like"
                    onClick={handleAddToWishlist}
                  >
                    <FcLikePlaceholder />{" "}
                  </div>
                )}
              </div>
            </div>

          

           

            <button className="horizontal-btn-add-bag" onClick={handleAddToBag}>
              Add to Bag <IoBag className="horizontal-bag-icon" />
            </button>
          </div>
        </div>
      
  );

}

export default HorizontalCardItems;