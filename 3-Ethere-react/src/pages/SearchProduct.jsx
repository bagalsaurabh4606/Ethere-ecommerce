import { useLocation, useNavigate } from "react-router-dom";
import summaryApi from "../comman";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import HomeItems from "../components/HomeItems";
import { useSelector } from "react-redux";
import styles from "../styles/SearchProduct.module.css";

const SearchProduct = () => {
  const query = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const bagItems = useSelector((state) => state.bag);
  const wishlistitem = useSelector((state) => state.wishlist);

  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(summaryApi.searchProduct.url + query.search);

    const dataResponse = await response.json();

    setLoading(false);
    setData(dataResponse.data);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className={styles.searchMainContainer}>
      {loading && <LoadingSpinner />}
      <p className={styles.searchResult}>{data.length} Results Found</p>
      {data.length === 0 && !loading && (
        <p className={styles.noResults}> Opps !!! </p>
      )}
      <div className={styles.itemsContainer}>
        {data.length !== 0 &&
          !loading &&
          data.map((item) => (
            <HomeItems
              key={item.id}
              item={item}
              bagItem={bagItems}
              wishlistitem={wishlistitem}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchProduct;
