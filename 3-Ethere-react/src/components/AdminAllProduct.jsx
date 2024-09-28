import { useState } from "react";
import { MdEdit } from "react-icons/md";
import EditAdminProduct from "./EditAdminProduct";
const AdminAllProduct = ({ product,fetchData }) => {
  const [editProduct, seteditProduct] = useState(false);

  const curruntprice=(product.originalPrice)-(product.originalPrice/100)*(product.discountPercentage)
  return (
    <div className="products-container">
      <div key={product.id} className="product-card">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h3>{product.name}</h3>
          <p> <b>Quantity:</b> {product.quantity}</p>
          <p> <b>Description:</b> {product.description}</p>
          <p><b>Category:</b> {product.category}</p>
          <p> <b>Original Price: Rs</b>{product.originalPrice}</p>
          <p><b>Discount:</b> {product.discountPercentage}%</p>
          <p><b>Final Price:</b>{Math.round(curruntprice)}</p>
        </div>
        <div className="edit_product1" onClick={() => seteditProduct(true)}>
          <MdEdit />
        </div>
      </div>
      {editProduct && (
        (<div className="edit_product_overlay">
          <EditAdminProduct
            data={product}
            onClose={() => seteditProduct(false)}
            fetchData={fetchData}
          ></EditAdminProduct>
        </div>)
      )}
    </div>
  );
};

export default AdminAllProduct;
