import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import summaryApi from "../comman";
import AdminAllProduct from "../components/AdminAllProduct";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]); // State to store all products
  const [uploadProduct, setUploadProduct] = useState(false); // State to toggle the upload product modal

  // Fetch all products from the API
  const fetchProduct = async () => {
    try {
      const dataResponse = await fetch(summaryApi.getProduct.url);
      const dataApi = await dataResponse.json();
      setAllProducts(dataApi?.data || []); // Set products or empty array if no data
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="upload-product-main">
      <div className="upload-btn-container">
        <button className="upload-btn" onClick={() => setUploadProduct(true)}>
          Upload Product
        </button>
      </div>

      {/* Show upload product modal if uploadProduct is true */}
      {uploadProduct && (
        <div className="Upload_product_overlay">
          <UploadProduct
            onClose={() => setUploadProduct(false)}
            fetchUploadProduct={fetchProduct}
          />
        </div>
      )}

      {/* Display all products */}
      <div className="products-container">
        {allProducts.map((product) => (
          <AdminAllProduct
            key={product.id}
            product={product}
            fetchData={fetchProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
