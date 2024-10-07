import { useDispatch, useSelector } from "react-redux";
import WishListItem from "../components/WishListItem";
import WishlistMessage from "../components/WishlistMessage";
import summaryApi from "../comman";
import { useEffect, useState } from "react";
import { wishlistActions } from "../store/wishlistSlice";

const WishListPage = () => {
  const wishItems = useSelector((state) => state.wishlist.wishProducts);
  const items = useSelector((state) => state.items.products);

  const FinalItems = items.filter((item) => {
    return wishItems.some((wishId) => wishId.id === item.id);
  });

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
