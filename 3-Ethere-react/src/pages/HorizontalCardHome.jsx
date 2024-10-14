import React from "react";
import { useSelector } from "react-redux";
import HorizontalCardItems from "../components/HorizontalCardItems";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "../styles/HorizontalCardHome.module.css"; // Import the CSS module

const HorizontalCardHome = ({ category }) => {
  const products = useSelector((state) => state.items.products || []);
  const items = products.filter((item) => item.category === category);
  const bagItems = useSelector((state) => state.bag);
  const wishlistitem = useSelector((state) => state.wishlist);

  return (
    <div className={styles.horizontalItemsContainerMain}>
      <Link className={styles.horizontalTitle} to={`/product-category/${category}`}>
        {category}
      </Link>
      
      <div className={styles.horizontalItemsContainer}>
        {items.map((item, index) => (
          <HorizontalCardItems key={item.id || index} item={item} />
        ))}
      </div>

      <Link className={styles.horizontalSeeMoreOverlay} to={`/product-category/${category}`}>
        <div className={styles.horizontalSeeMoreText}>
          See More <MdArrowForwardIos />
        </div>
      </Link>
    </div>
  );
};

export default HorizontalCardHome;
