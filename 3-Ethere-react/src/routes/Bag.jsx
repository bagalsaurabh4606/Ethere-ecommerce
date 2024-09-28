import Footer from "../components/Footer";
import Header from "../components/Header";
import BagSummary from "../components/BagSummary";
import BagItem from "../components/BagItem";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import summaryApi from "../comman";
import { useEffect, useState } from "react";
import { bagActions } from "../store/bagSlice";
const Bag=()=>{
  const dispatch=useDispatch()

  const [bagData,setBagData]=useState([]);
  const fetchbagproduct=async()=>{
    const response=await fetch(summaryApi.getBagproducts.url,{
      method:summaryApi.getBagproducts.method,
      credentials:'include',  
      headers:{
        "content-type":"application/json"
      },

    })
    const responseData=await response.json()

    if(responseData.success){
      setBagData(responseData?.data);
      dispatch(bagActions.addToBag(responseData?.data));
    }

  }
const bagItems= useSelector(store=>store.bag);
const items=useSelector(state=>state.items.products);
 

const flatbagItems=bagItems.flat()
const FinalItems = items.filter((item) => {
  return flatbagItems.some((bagItem) => bagItem.productId === item.id.toString());
});

useEffect(()=>{
  fetchbagproduct();
},[])

  
return <>

<main>

     {FinalItems.length===0?<Message></Message>
     :
     <div className="bag-page">

        <div className="bag-items-container">{bagData.map(item=> <BagItem item={item} fetchbagproduct={fetchbagproduct} key={FinalItems.id} ></BagItem>)}</div>
         

        <div className="bag-summary"> <BagSummary FinalItems={FinalItems}  ></BagSummary></div>
        </div>}
        
      </main>
  
</>
}

export default Bag;