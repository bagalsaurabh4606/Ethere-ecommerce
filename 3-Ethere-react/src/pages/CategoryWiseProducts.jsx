import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CatagoryList from "../components/CatagoryList";
import HomeItems from "../components/HomeItems";
import styles from "../styles/CategoryWiseProducts.module.css"; // Import the CSS module

const CategoryWiseProducts = () => {
  const { category } = useParams(); // Get the category from the URL parameters
  const bagItems = useSelector((state) => state.bag); // Get bag items from Redux state
  const products = useSelector((state) => state.items.products || []); // Get all products from Redux state
  const wishlistitem = useSelector((state) => state.wishlist); // Get wishlist items from Redux state

  const [filteredItem, setFilteredItem] = useState([]); // State for storing category-filtered products

  // Filter products by category whenever category or products change
  useEffect(() => {
    const items = products.filter((item) => item.category === category);
    setFilteredItem(items);
  }, [category, products]);

  return (
    <main>
      {/* Display the category list */}
      <div>
        <CatagoryList />
      </div>
      <hr className={styles.hrTag} />
      
      {/* Display filtered items */}
      <div className={styles.itemsContainer}>
        {filteredItem.map((item) => (
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
