
// new
import React, { useState, useEffect } from "react";
import Fabric from "../../public/images/Fabric.jpg";
import Scrunchies from "../../public/images/Scrunchies.jpg";
import Polymer from "../../public/images/Polymer.jpg";
import WristCharms from "../../public/images/WristCharms.jpg";
import Crochet from "../../public/images/Crochet.jpg";

const BannerImage = () => {
  const images = [Fabric, Scrunchies, Polymer, WristCharms, Crochet];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    // Clear interval on component unmount
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
    <div className="banner-container">
      <div className="banner-image">
        <img src={images[currentImageIndex]} alt={`Banner ${currentImageIndex}`} />
      </div>
      <button className="arrow left-arrow" onClick={handlePrevClick}>
        &#10094; {/* Left arrow icon */}
      </button>
      <button className="arrow right-arrow" onClick={handleNextClick}>
        &#10095; {/* Right arrow icon */}
      </button>
    </div>
  );
};

export default BannerImage;



















// import Fabric from "../../public/images/Fabric.jpg";
// import Scrunchies from "../../public/images/Scrunchies.jpg";
// import Polymer from "../../public/images/Polymer.jpg";
// import WristCharms from "../../public/images/WristCharms.jpg";
// import Crochet from "../../public/images/Crochet.jpg";

// const BannerImage = () => {
//   const images = [Fabric, Scrunchies, Polymer, WristCharms, Crochet];
//   return (
//     <div className="banner-main-container">

//       <div className="banner-container">
//         {images.map((image, index) => {
//           return (
//             <div className="banner-image">
//               <img src={image} alt="" />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BannerImage;
