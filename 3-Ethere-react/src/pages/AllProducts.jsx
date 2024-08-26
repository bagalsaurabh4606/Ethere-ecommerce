import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import summaryApi from "../comman";
import AdminAllProduct from "../components/AdminAllProduct";

const AllProducts = () => {
  const [allProducts, setallProducts] = useState([]);

  const fetchProduct = async () => {
    const dataResponse = await fetch(summaryApi.getProduct.url);
    const dataApi = await dataResponse.json();
    setallProducts(dataApi?.data || []); //emtpy if not data is not available
   
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const [uploadProduct, setUploadProduct] = useState(false); 
  return (
    <div className="upload-product-main">
      <div className="upload-btn-container">
        <button className="upload-btn" onClick={() => setUploadProduct(true)}>
          Upload Product
        </button>{" "}
      </div>

      {uploadProduct && (
        <div className="Upload_product_overly">
          <UploadProduct onClose={() => setUploadProduct(false)} fetchuploadProduct={fetchProduct} />
        </div>
      )}

      <div className="products-container">
        {allProducts.map((product) => (
          <AdminAllProduct key={product.id} product={product} fetchData={fetchProduct}/>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
