import summaryApi from "../comman";
import { wishlistActions } from "../store/wishlistSlice";

const deleteCartProduct = async (e, item, dispatch) => {
  e?.stopPropagation();
  e?.preventDefault();
  dispatch(wishlistActions.removeFromWishlist(item.id || item.productId)); // or is for product comming from wishlist page
  const response = await fetch(summaryApi.deleteCartProduct.url, {
    method: summaryApi.deleteCartProduct.method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: item?.id,
    }),
    credentials: "include",
  });
};
export default deleteCartProduct;
