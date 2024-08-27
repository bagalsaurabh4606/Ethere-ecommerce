import { toast } from "react-toastify";
import summaryApi from "../comman";
import { useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";

const addTobag= async(e,item,dispatch)=>{
e?.stopPropagation()
e?.preventDefault()
console.log("item in add to bag function",item)

  const response = await fetch(summaryApi.addToBag.url,{
    method:summaryApi.addToBag.method,
    credentials:'include',
    headers:{
      "content-type":"application/json"
    },

    body:JSON.stringify(
      {productId : item.id , image:item.image , 
        category: item.category,
        name:item.name,
        description: item.description,
        originalPrice: item.originalPrice,
        discountPercentage: item.discountPercentage,
      }
    )
  })

  const responseData=await response.json()
 

  if(responseData.success){
    toast.error(responseData.message)
    dispatch(bagActions.addToBag(responseData))
  }
  if(responseData.error){
    toast.success(responseData.message)
  }
  
}

export default addTobag;