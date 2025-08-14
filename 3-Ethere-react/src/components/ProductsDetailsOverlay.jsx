import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "../styles/ProductsDetailsOverlay.module.css";
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import addTobag from "../helper/addTobag";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { IoBag } from "react-icons/io5";
import addTocart from "../helper/addTocart";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const items = useSelector((store) => store.items.products);
  const product = items.find((item) => item.id === Number(productId));
  const bagItem = useSelector((store) => store.bag.bagProducts);
  const wishlistitem = useSelector((state) => state.wishlist.wishProducts);
  const dispatch = useDispatch();

  const wishlistelementfound = wishlistitem.some((wishID) => wishID.id === product.id);
  const [isInWishlist, setIsInWishlist] = useState(wishlistelementfound);

  useEffect(() => {
    setIsInWishlist(wishlistelementfound);
  }, [wishlistelementfound]);

  const bagitemelementfound = bagItem.some((bagId) => bagId.id === product.id);
  const [isInBag, setIsInBag] = useState(false);

  useEffect(() => {
    setIsInBag(bagitemelementfound);
  }, [bagitemelementfound]);

  const handleAddToBag = (e) => {
    dispatch(bagActions.addToBag(product));
    addTobag(e, product, dispatch);
    setIsInBag(true);
  };

  const handleRemoveFromBag = (e) => {
    deletefrombag(e, product, dispatch);
    setIsInBag(false);
  };

  const handleAddToWishlist = (e) => {
    addTocart(e, product, dispatch);
    setIsInWishlist(true);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-change images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        product.image ? (prevIndex + 1) % product.image.length : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      product.image ? (prevIndex + 1) % product.image.length : 0
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      product.image ? (prevIndex - 1 + product.image.length) % product.image.length : 0
    );
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const currPrice = product.originalPrice - (product.originalPrice / 100) * product.discountPercentage;

  console.log("items in product detail container",product);
  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          {product.image && product.image.length > 0 && (
            <div className={styles.carousel}>
              <button className={styles.arrowButton} onClick={handlePrevImage}>
                &larr;
              </button>
              <img
                src={product.image[currentImageIndex]}
                alt={`Product ${currentImageIndex + 1}`}
                className={styles.productImage}
              />
              <button className={styles.arrowButton} onClick={handleNextImage}>
                &rarr;
              </button>
            </div>
          )}
        </div>
        <div className={styles.details}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>Current Price: Rs {Math.round(currPrice)}</span>
            <span className={styles.originalPrice}>Original Price: Rs {product.originalPrice}</span>
            <span className={styles.discount}>(discount: {product.discountPercentage}% OFF)</span>
          </div>

          <div className={styles.buttonsContainer}>
            {!isInBag ? (
              <button className={styles.addToBagButton} onClick={handleAddToBag}>
                Add to Bag
              </button>
            ) : (
              <div className={styles.towButtonsContainerr}>
                <Link to={"/bag"} className={styles.bagLink}>
                  <button className={styles.buyNowButton}>
                    Buy Now <IoBag />
                  </button>
                </Link>
              </div>
            )}
            <button
              className={isInWishlist ? styles.addToWishlistButton : styles.addToWishlistButton}
              onClick={handleAddToWishlist}
            >
              {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
