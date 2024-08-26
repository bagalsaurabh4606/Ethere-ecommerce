import { toast } from "react-toastify";
import summaryApi from "../comman";

const addTocart= async(e,item)=>{
e?.stopPropagation()
e?.preventDefault()
  const response = await fetch(summaryApi.addTocart.url,{
    method:summaryApi.addTocart.method,
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
  }
  if(responseData.error){
    toast.success(responseData.message)
  }
  
}

export default addTocart;