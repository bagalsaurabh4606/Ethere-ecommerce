import { useEffect, useState } from "react";
import summaryApi from "../comman";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { categoryAction } from "../store/categorySlice";

const CatagoryList = () => {
  // const [CategoryProduct, setcategoryProducts] = useState([]);
  // const [Loading, setLoading] = useState(false);

  const CategoryProduct=useSelector((store)=>store?.category)

  return (
    
    <div className="main-category-container" >
      {CategoryProduct.map((produts, index) => {
        return (
          <Link to={"/product-category/"+produts?.category} className="category-container">
              <div className="category-img">
                <img src={produts.image} alt={produts.category} />
              </div>
              <div
                className="Product-category-name">
                <p>{produts.category}</p>
              </div>
            
          </Link>
        );
      })}
    </div>
    
  );
};

export default CatagoryList;
