import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryAction } from "../store/categorySlice";
import styles from "../styles/CatagoryList.module.css"; // Import the CSS module
import summaryApi from "../comman";

const CatagoryList = () => {
  const dispatch = useDispatch();
  const { category: currentCategory } = useParams(); // Get the current category from the URL

  const fetchCategoryProduct = async () => {
    const response = await fetch(summaryApi.categoryProduct.url);
    const dataResponse = await response.json();

    if (dataResponse.success) {
      dispatch(categoryAction.addInitialItems(dataResponse?.data));
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  const CategoryProduct = useSelector((store) => store?.category);

  return (
    <div className={styles.mainCategoryContainer}>
      {CategoryProduct.map((produts, index) => (
        <Link
          key={index}
          to={`/product-category/${produts.category}`}
          className={`${styles.categoryContainer} ${
            currentCategory === produts.category ? styles.selectedCategory : ""
          }`}
        >
          <div className={styles.categoryImg}>
            <img src={produts.image} alt={produts.category} />
          </div>
          <div className={styles.productCategoryName}>
            <p>{produts.category}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CatagoryList;
