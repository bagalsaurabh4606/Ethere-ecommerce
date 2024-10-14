import { useLocation } from "react-router-dom";
import summaryApi from "../comman";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import HomeItems from "../components/HomeItems";
import { useSelector } from "react-redux";

const SearchProduct = () => {
  const query = useLocation(); // Get query parameters from the location
  const [data, setData] = useState([]); // Store search results
  const [loading, setLoading] = useState(false); // Manage loading state
  const bagItems = useSelector((state) => state.bag); // Get bag items from Redux store
  const wishlistItems = useSelector((state) => state.wishlist); // Get wishlist items from Redux store

  // Fetch products based on search query
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${summaryApi.searchProduct.url}${query.search}`);
      const dataResponse = await response.json();
      setData(dataResponse.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setData([]); // Clear data on error to prevent displaying stale results
    } finally {
      setLoading(false);
    }
  };

  // Fetch products whenever the query changes
  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className="search-main-container">
      {loading && <LoadingSpinner />}

      <p className="search-result">{data.length} Results Found</p>

      {/* Display a message if no results are found */}
      {data.length === 0 && !loading && (
        <p className="no-results">Opps!!! No results found.</p>
      )}

      {/* Display the list of products if available */}
      <div className="items-container">
        {data.length !== 0 && !loading &&
          data.map((item) => (
            <HomeItems
              key={item.id}
              item={item}
              bagItem={bagItems}
              wishlistitem={wishlistItems}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchProduct;
