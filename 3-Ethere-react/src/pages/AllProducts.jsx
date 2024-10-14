import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import summaryApi from "../comman";
import AdminAllProduct from "../components/AdminAllProduct";
import styles from "../styles/AllProducts.module.css"; // Importing CSS module

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [uploadProduct, setUploadProduct] = useState(false); 

  const fetchProduct = async () => {
    const dataResponse = await fetch(summaryApi.getProduct.url);
    const dataApi = await dataResponse.json();
    setAllProducts(dataApi?.data || []); // Set to empty if no data is available
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className={styles.uploadProductMain}>
      <div className={styles.uploadBtnContainer}>
        <button className={styles.uploadBtn} onClick={() => setUploadProduct(true)}>
          Upload Product
        </button>
      </div>

      {uploadProduct && (
        <div className={styles.uploadProductOverlay}>
          <UploadProduct onClose={() => setUploadProduct(false)} fetchuploadProduct={fetchProduct} />
        </div>
      )}

      <div className={styles.productsContainer}>
        {allProducts.map((product) => (
          <AdminAllProduct key={product.id} product={product} fetchData={fetchProduct} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
