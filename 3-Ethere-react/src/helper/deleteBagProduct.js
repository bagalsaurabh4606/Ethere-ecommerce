import { json } from "react-router-dom"
import summaryApi from "../comman"
import { bagActions } from "../store/bagSlice"
import { toast } from "react-toastify"

const deletefrombag=async(e,item,dispatch)=>{
  e?.stopPropagation()
  e?.preventDefault()
  console.log("item .id",item.id)
  
  let itemId = item.id;
  const hasUserId = item.userId !== undefined;

  if(hasUserId)
  {
    itemId=item.productId;
  }

  dispatch(bagActions.removeFromBag(itemId))
  const response=await fetch(summaryApi.deleteBagProduct.url,{
    method:summaryApi.deleteBagProduct.method,
    headers:{
      "Content-Type":"application/json"
    },  
    body:JSON.stringify({
      productId:itemId
    }),
    credentials:'include'
  })
  const dataApi=await response.json()
  console.log("data api",dataApi)
  if (dataApi.success) {
    toast.success(dataApi.message);
  } else {
    toast.error(dataApi.message || "Failed to remove product from bag.");
  }
}

export default deletefrombag;