import { useDispatch, useSelector } from "react-redux";
import WishListItem from "../components/WishListItem";
import WishlistMessage from "../components/WishlistMessage";
import summaryApi from "../comman";
import { useEffect, useState } from "react";
import { wishlistActions } from "../store/wishlistSlice";

const WishListPage = () => {
  const dispatch=useDispatch()

  const fetchcartproduct=async()=>{
    const response=await fetch(summaryApi.getCartProduct.url,{
      method:summaryApi.getCartProduct.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },

    })
    const responseData=await response.json()
    console.log("ye cart ka product agaya dekh",responseData);

    if(responseData.success){
      dispatch(wishlistActions.addToWishlist(responseData?.data));
    }

  }

  const FinalItems=useSelector((state)=>state.wishlist)
  console.log("final item",FinalItems)

  useEffect(()=>{
    fetchcartproduct();
  },[])

  return (
    <>
      <main>
        {FinalItems.length === 0 ? (
          <WishlistMessage></WishlistMessage>
        ) : (
          <div className="wishlist-items-container">
            {FinalItems.map((item) => (
              <WishListItem item={item}></WishListItem>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default WishListPage;
