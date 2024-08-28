import { useSelector } from "react-redux";
import HorizontalCardItems from "../components/HorizontalCardItems";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";


const HorizontalCardHome = ({ category }) => {

  // const allitems = useSelector((store) => store.items);
  const products=useSelector((state)=>state.items.products || [])
  console.log("yes got it brroo" , products)
  const items = products.filter((item) => item.category === category);
  const bagItems=useSelector((state)=>state.bag)
  console.log("bag items in horizontalhome",bagItems)

  const wishlistitem=useSelector((state)=>state.wishlist)
  console.log("wishlist item in horizontalhome",wishlistitem)
 
  
  return <div className="horizontal-items-container-main">
    <div className="horizontal-title">{category}</div>
    <div className="horizontal-items-container" >{items.map((item)=><HorizontalCardItems item={item}/>)}
    </div>
    <Link className="horizontal-see-more-overlay" to={"/product-category/" + category}>
    <div className="horizontal-see-more-text">See More <MdArrowForwardIos/></div>
  </Link>
  </div>
};

export default HorizontalCardHome;
