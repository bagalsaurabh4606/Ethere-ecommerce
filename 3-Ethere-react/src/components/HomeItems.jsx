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
const HomeItems = ({ item }) => {
console.log("overall item",item)

 const wishlistitem = useSelector((state) => state.wishlist);

  const elementfound = wishlistitem.some((i) => i.productId === item.id.toString());
  console.log("element found", elementfound);
 
  // const [elementfound,setElementfound]=useState(false) //used for fetching cart product
  // const bagItemelement = useSelector((state) => state.bag);
  
  // const bagitemelementfound = bagItemelement.indexOf(item.id) >= 0;
  const bagItem = useSelector((state) => state.bag);
 
  const bagItemelement=bagItem.flat()
  console.log("bag store product comming",bagItemelement);
  const bagitemelementfound = bagItemelement.some((bagItem) => bagItem.productId === item.id.toString());

  console.log("bagitemelementfound",bagitemelementfound)
  const dispatch = useDispatch();

  const handleAddtoBag = () => {
    dispatch(bagActions.addToBag(item.id));
  };
  const handleremovetoBag = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };
  const wishlisthandle = () => {
    console.log("wishlist added", item.id);
    dispatch(wishlistActions.addToWishlist(item.id));
  };
  const removeWishlist = () => {
    dispatch(wishlistActions.removeFromWishlist(item.id));
  };
  const curr_price =item.originalPrice-((item.originalPrice /100)*item.discountPercentage);
  
    //     const fetchcartproduct = async () => {
    //   const response = await fetch(summaryApi.getCartProduct.url, {
    //     method: summaryApi.getCartProduct.method,
    //     credentials: "include",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   });
    //   const responseData = await response.json();
    //   console.log("Fetched cart productsss:", responseData);

    //   const element=responseData.data
    //   const elementfound1 = element.some((i) => i.productId === item.id.toString());
    //   setElementfound(elementfound1)

    // };
    // useEffect(()=>{fetchcartproduct()},[item])

  return (
    <div className="item-container">
      <img className="item-image" src={item.image} alt="item image" />
      <div className="rating_container">
        <div className="rating">
          {/* {" "}
          {item.rating.stars} ⭐ | {item.rating.count}{" "} */}
        </div>

        <div className="wishlist-icon">
          {elementfound ? (
            <div className="like" onClick={removeWishlist}>
              <FcLike />
            </div>
          ) : (
            <div className="like" onClick={(e)=>{addTocart(e,item,dispatch)}}> 
             {/* fetchcartproduct() called inside onclick*/}
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

      
        {! bagitemelementfound ? (
          <button className="btn-add-bag" onClick={(e)=>{addTobag(e,item ,dispatch)}}>
            Add to Bag <IoBag/>
          </button>
        ) : (
          <div className="tow-buttons-container">
          <Link to={"/bag"} className="bag-link">
            
          <button className="buy-now-button">
            Buy Now <IoBag/>
          </button></Link> 
          <button className="remove-button" onClick={handleremovetoBag}>
          <RiDeleteBin4Fill />
          </button>
          </div>
          
        )}
    </div>
  );
};

export default HomeItems;

