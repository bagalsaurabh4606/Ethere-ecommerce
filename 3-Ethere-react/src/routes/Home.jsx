import { useEffect, useState } from "react";
import BannerImage from "../components/BannerImage";
import CatagoryList from "../components/CatagoryList";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../comman";
import { categoryAction } from "../store/categorySlice";
import HorizontalCardHome from "../pages/HorizontalCardHome";

const Home = ({ fetchbagproduct }) => {
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

  return (
    <div>
      <div>
        <BannerImage />
      </div>

      {CategoryProduct.map((item, index) => (
        <div key={index}>
          {" "}
          <HorizontalCardHome
            category={item?.category}
            fetchbagproduct={fetchbagproduct}
            key={item.id}
          />{" "}
        </div>
      ))}
    </div>
  );
};
export default Home;
