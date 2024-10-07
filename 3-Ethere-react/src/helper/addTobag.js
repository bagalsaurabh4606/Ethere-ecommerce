import { toast } from "react-toastify";
import summaryApi from "../comman";
import { useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";

const addTobag = async (e, item, dispatch) => {
  e?.stopPropagation();
  e?.preventDefault();

  const response = await fetch(summaryApi.addToBag.url, {
    method: summaryApi.addToBag.method,
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
      quantity: item.quantity,
    }),
  });

  const responseData = await response.json();
};

export default addTobag;
