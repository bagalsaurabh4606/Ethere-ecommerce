import { useEffect, useState } from "react";
import summaryApi from "../comman";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { categoryAction } from "../store/categorySlice";

const CatagoryList = () => {
  const dispatch = useDispatch();
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
  console.log("in cagtegory after refresh", CategoryProduct);

  return (
    <div className="main-category-container">
      {CategoryProduct.map((produts, index) => {
        return (
          <Link
            to={"/product-category/" + produts?.category}
            className="category-container"
          >
            <div className="category-img">
              <img src={produts.image} alt={produts.category} />
            </div>
            <div className="Product-category-name">
              <p>{produts.category}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CatagoryList;
