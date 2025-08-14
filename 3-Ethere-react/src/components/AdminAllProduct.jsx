import { useState } from "react";
import { MdEdit } from "react-icons/md";
import EditAdminProduct from "./EditAdminProduct";
import styles from "../styles/AdminAllProduct.module.css"; // Importing CSS module
import { RiDeleteBin4Fill } from "react-icons/ri";
import DeleteProductConfirm from "./DeleteProductConfirm";

const AdminAllProduct = ({ product, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  const [deleteProduct,setDeleteProduct] = useState(false);

  const currentPrice = (product.originalPrice) - (product.originalPrice / 100) * (product.discountPercentage);

  return (
    <div className={styles.productsContainer}>
      <div key={product.id} className={styles.productCard}>
        <img src={product.image[0]} alt={product.name} className={styles.productImage} />
        <div className={styles.productInfo}>
          <h3>{product.name}</h3>
          <p><b>Quantity:</b> {product.quantity}</p>
          <p><b>Description:</b> {product.description}</p>
          <p><b>Category:</b> {product.category}</p>
          <p><b>Original Price: Rs</b> {product.originalPrice}</p>
          <p><b>Discount:</b> {product.discountPercentage}%</p>
          <p><b>Final Price:</b> {Math.round(currentPrice)}</p>
        </div>
        <div className={styles.editProductIcon} onClick={() => setEditProduct(true)}>
          <MdEdit />
        </div>
        <div className={styles.deleteProductIcon} onClick={() => setDeleteProduct(true)}>
        <RiDeleteBin4Fill/>
        </div>
      </div>
      {editProduct && (
        <div className={styles.editProductOverlay}>
          <EditAdminProduct
           onClose={() => setEditProduct(false)}
            data={product}
            fetchData={fetchData}
          />
        </div>
      )}
      {deleteProduct && (
        <div className={styles.editProductOverlay}>
          <DeleteProductConfirm product={product} setDeleteProduct={setDeleteProduct}  fetchData={fetchData}/>
        </div>
      )}
    </div>
  );
};

export default AdminAllProduct;
