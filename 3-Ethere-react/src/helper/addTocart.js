import { toast } from "react-toastify";
import summaryApi from "../comman";
import { useDispatch } from "react-redux";
import { wishlistActions } from "../store/wishlistSlice";

const addTocart = async (e, item, dispatch) => {
  e?.stopPropagation();
  e?.preventDefault();

  dispatch(wishlistActions.addToWishlist(item));
  const response = await fetch(summaryApi.addTocart.url, {
    method: summaryApi.addTocart.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify({
      id: item.id,
      image: item.image,
      category: item.category,
      name: item.name,
      description: item.description,
      originalPrice: item.originalPrice,
      discountPercentage: item.discountPercentage,
    }),
  });

  const responseData = await response.json();
};

export default addTocart;
