import { json } from "react-router-dom";
import summaryApi from "../comman";
import { bagActions } from "../store/bagSlice";
import { toast } from "react-toastify";

const deletefrombag = async (e, item, dispatch) => {
  e?.stopPropagation();
  e?.preventDefault();
  dispatch(bagActions.removeFromBag(item.id));

  dispatch(bagActions.removeFromBag(item.id));
  const response = await fetch(summaryApi.deleteBagProduct.url, {
    method: summaryApi.deleteBagProduct.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: item.id,
    }),
    credentials: "include",
  });
  const dataApi = await response.json();
  if (dataApi.success) {
  } else {
    toast.error(dataApi.message || "Failed to remove product from bag.");
  }
};

export default deletefrombag;
