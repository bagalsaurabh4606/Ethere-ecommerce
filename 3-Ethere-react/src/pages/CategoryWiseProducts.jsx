import { useDispatch, useSelector } from "react-redux";
import fetchproductOne from "../helper/fetchCategoryProduct";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CatagoryList from "../components/CatagoryList";
import HomeItems from "../components/HomeItems";


const CategoryWiseProducts = () => {
  const { category } = useParams();
  const bagItems = useSelector((state) => state.bag);
  const products = useSelector((state) => state.items.products || []);
  const wishlistitem = useSelector((state) => state.wishlist);

  const [fileterdItem, setfilteredItem] = useState([]);
  useEffect(() => {
    const items = products.filter((item) => item.category === category);
    setfilteredItem(items);
  }, [category, products]);

  return (
    <main>
      <div>
        <CatagoryList />
      </div>
      <hr className="hr-tag"/>
      <div className="items-container">
        {fileterdItem.map((item) => (
          <HomeItems
            key={item.id}
            item={item}
            bagItem={bagItems}
            wishlistitem={wishlistitem}
          />
        ))}
      </div>
    </main>
  );
};

export default CategoryWiseProducts;
