import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CgChevronDown } from "react-icons/cg";
import { Link, useParams } from "react-router-dom";
import CatagoryList from "../components/CatagoryList";
import HomeItems from "../components/HomeItems";
import styles from "../styles/CategoryWiseProducts.module.css"; // Import the CSS module

const CategoryWiseProducts = () => {
  const { category } = useParams(); // Get the category from the URL parameters
  const bagItems = useSelector((state) => state.bag); // Get bag items from Redux state
  const products = useSelector((state) => state.items.products || []); // Get all products from Redux state
  const wishlistitem = useSelector((state) => state.wishlist); // Get wishlist items from Redux state
  const CategoryProduct = useSelector((store) => store?.category);
  const [filteredItem, setFilteredItem] = useState([]); // State for storing category-filtered products
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  // Filter products by category whenever category or products change
  useEffect(() => {
    const items = products.filter((item) => item.category === category);
    setFilteredItem(items);
  }, [category, products]);
  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const handleCategorySelect = (selectedCategory) => {
    toggleOverlay(); // Close the overlay when a category is selected
    navigate(`/category/${selectedCategory}`); // Navigate to the selected category page
  };
  return (
    <main>
      {/* Show category heading for mobile view */}
      <div className={styles.mobileCategoryHeading}
      onClick={toggleOverlay}
      >
        {category}
        <CgChevronDown/>
      </div>
      {isOverlayVisible && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <button className={styles.crossButton} onClick={toggleOverlay}>
            <IoMdClose/>
            </button>
            <div className={styles.categoryListContainer}>
              {CategoryProduct?.map((cat, index) => (
                <Link
                to={`/product-category/${cat.category}`}
                  key={index}
                  className={styles.categoryItem}
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat.category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Display the category list only on larger screens */}
      <div className={styles.mainCategoryContainer}>
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