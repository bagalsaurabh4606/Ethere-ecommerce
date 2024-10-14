import React, { useState, useEffect } from "react"; 
import Fabric from "/images/Fabric.jpg";
import Scrunchies from "/images/Scrunchies.jpg";
import Polymer from "/images/Polymer.jpg";
import WristCharms from "/images/WristCharms.jpg";
import Crochet from "/images/Crochet.jpg";
import styles from "../styles/BannerImage.module.css"; // Adjust the path as necessary

const BannerImage = () => {
  const images = [Fabric, Scrunchies, Polymer, WristCharms, Crochet];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerImage}>
        <img src={images[currentImageIndex]} alt={`Banner ${currentImageIndex}`} />
      </div>
      <button className={`${styles.arrow} ${styles.leftArrow}`} onClick={handlePrevClick}>
        &#10094; {/* Left arrow icon */}
      </button>
      <button className={`${styles.arrow} ${styles.rightArrow}`} onClick={handleNextClick}>
        &#10095; {/* Right arrow icon */}
      </button>
    </div>
  );
};

export default BannerImage;
