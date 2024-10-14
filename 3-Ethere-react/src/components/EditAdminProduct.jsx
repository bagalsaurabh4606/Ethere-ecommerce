import { useState } from "react";
import { GrClose } from "react-icons/gr";
import productCatagory from "../helper/productCatagory";
import { MdCloudUpload } from "react-icons/md";
import uploadImage from "../helper/uploadImage";
import summaryApi from "../comman";
import { toast } from "react-toastify";
import styles from "../styles/EditAdminProduct.module.css"; // Importing the CSS module

const EditAdminProduct = ({ onClose, data, fetchData }) => {
  const [product, setProduct] = useState({
    ...data,
    id: data?.id,
    category: data?.category,
    name: data?.name,
    description: data?.description,
    originalPrice: data?.originalPrice,
    discountPercentage: data?.discountPercentage,
    image: data?.image || [],
    quantity: "",
  });

  const [uploadImageInput, setUploadImageInput] = useState(" ");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseData = await fetch(summaryApi.updateProduct.url, {
      method: summaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const productData = await responseData.json();

    if (productData.success) {
      toast.success(productData?.message);
      onClose();
      fetchData();
    }
    if (productData.error) {
      toast.error(productData?.message);
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setUploadImageInput(file.name);

    const uploadImageCloudinary = await uploadImage(file);

    setProduct((prev) => {
      return {
        ...prev,
        image: [...prev.image, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteImage = (index) => {
    const newProductImage = [...product.image];
    newProductImage.splice(index, 1);
    setProduct((prev) => {
      return {
        ...prev,
        image: [...newProductImage],
      };
    });
  };

  return (
    <div className={styles.productUploadBox}> {/* Use CSS module class */}
      <div className={styles.crossIcon} onClick={onClose}>
        <GrClose />
      </div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={product.id}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            {productCatagory.map((el) => (
              <option key={el.value} value={el.value}>
                {el.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="originalPrice">Original Price:</label>
          <input
            type="number"
            id="originalPrice"
            name="originalPrice"
            value={product.originalPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="discountPercentage">Discount Percentage:</label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={product.discountPercentage}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Image URL:</label>
          <label htmlFor="image">
            <div className={styles.uploadImage}>
              <div className={styles.imageBox}>
                <MdCloudUpload className={styles.uploadIcon} />
              </div>
              <p>Upload image here</p>
              <input
                type="file"
                id="image"
                name="image"
                style={{ display: "none" }}
                onChange={handleUploadImage}
              />
            </div>
          </label>
        </div>

        <div className={styles.uplodedImageDiv}>
          {product?.image[0] ? (
            <div className={styles.imagesContainer}>
              {product.image.map((el, index) => (
                <div className={styles.uploadedImage} key={index}>
                  <div className={styles.deleteImage} onClick={() => handleDeleteImage(index)}>
                    <GrClose />
                  </div>
                  <img src={el} width={80} height={80} alt="" />
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "red" }}>*Please Upload Product Image</p>
          )}
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditAdminProduct;
