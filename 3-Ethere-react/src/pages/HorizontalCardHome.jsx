import React, { useRef } from "react";
import { useSelector } from "react-redux";
import HorizontalCardItems from "../components/HorizontalCardItems";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

import styles from "../styles/HorizontalCardHome.module.css"; // Import the CSS module

const HorizontalCardHome = ({ category }) => {
  const products = useSelector((state) => state.items.products || []);
  const items = products.filter((item) => item.category === category);
  const bagItems = useSelector((state) => state.bag);
  const wishlistitem = useSelector((state) => state.wishlist);

  const containerRef = useRef(null);

  
  const handleScroll = () => {
    console.log("clicked",containerRef.current
  )

    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 320, 
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.horizontalItemsContainerMain}>

      <div className={styles.titleContainer}>
        <Link className={styles.horizontalTitle} to={`/product-category/${category}`}>
        {category}
      </Link>
      <Link className={styles.horizontalViewAll} to={`/product-category/${category}`}>
         Veiw More<div className={styles.seemore}><MdArrowForwardIos /></div>
      </Link>
      </div>
      
      <div className={styles.horizontalItemsContainer} ref={containerRef}>
        {items.map((item, index) => (
          <HorizontalCardItems key={item.id || index} item={item} />
        ))}
      </div>

      <div className={styles.horizontalSeeMoreOverlay}>
        <div className={styles.horizontalSeeMoreText} onClick={handleScroll}>
          <MdArrowForwardIos />
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardHome;
