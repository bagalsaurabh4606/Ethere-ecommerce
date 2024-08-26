import Footer from "../components/Footer";
import Header from "../components/Header";
import BagSummary from "../components/BagSummary";
import BagItem from "../components/BagItem";
import { useSelector } from "react-redux";
import Message from "../components/Message";
const Bag=()=>{

const bagItems= useSelector(store=>store.bag);

const items=useSelector(state=>state.items);

const FinalItems=items.filter(item=>{
  const itemIndex=bagItems.indexOf(item.id);
  return itemIndex>=0;
})
  
return <>

<main>

     {FinalItems.length===0?<Message></Message>
     :
     <div className="bag-page">

        <div className="bag-items-container">{FinalItems.map(item=> <BagItem item={item} key={FinalItems.id} ></BagItem>)}</div>
         
        <div className="bag-summary"> <BagSummary FinalItems={FinalItems}></BagSummary></div>
        </div>}
        
      </main>
  
</>
}

export default Bag;