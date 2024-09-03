import { toast } from "react-toastify"

import summaryApi from "../comman"
import { wishlistActions } from "../store/wishlistSlice"

const deleteCartProduct=async(e,item,dispatch)=>{
  e?.stopPropagation()
  e?.preventDefault()
  console.log("item comming",typeof(item.id))
  dispatch(wishlistActions.removeFromWishlist(item.id || item.productId)); // or is for product comming from wishlist page
  const response=await fetch(summaryApi.deleteCartProduct.url,{
    method:summaryApi.deleteCartProduct.method,
    headers:{
      "Content-type":"application/json",
    },
    body:JSON.stringify({
      productId:item.id ||item.productId,
    }),
    credentials:'include'
  })
  const dataApi=await response.json()

  if(dataApi.success){
 toast.success("Product removed from favorite!!!")
  }else{
    toast.error(dataApi.message ||"Failed to remove product from favorite")
  }

}
export default deleteCartProduct;