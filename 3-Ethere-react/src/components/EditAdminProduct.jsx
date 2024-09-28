import { useState } from "react";
import { GrClose } from "react-icons/gr";
import productCatagory from "../helper/productCatagory";
import { MdCloudUpload } from "react-icons/md";
import uploadImage from "../helper/uploadImage";
import summaryApi from "../comman";
import { json } from "react-router-dom";
import { toast } from "react-toastify";
const EditAdminProduct=({onClose , data ,fetchData})=>{
  const [product, setProduct] = useState({
    ...data,
    id: data?.id,
    category: data?.category,
    name: data?.name,
    description: data?.description,
    originalPrice:data?.originalPrice,
    discountPercentage: data?.discountPercentage,
    image: data?.image || [],
    quantity:"",
  });

  const [uploadImageInput, setuploadImageInput] = useState(" ");
  const handleChange = (e) => {
    const {name , value} = e.target

    setProduct((preve) => {
      return {
        ...preve,
        [name]:value
      };
    });

  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const responseData=await fetch(summaryApi.updateProduct.url,{
      method:summaryApi.updateProduct.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(product)
    })
    const productData= await responseData.json()

    if(productData.success){
      toast.success(productData?.message)
      onClose()
      fetchData( )
    }
    if(productData.error){
      toast.error(productData?.message)
    }
  };
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setuploadImageInput(file.name);

    const uploadImageCloudinary = await uploadImage(file);

    setProduct((preve) => {
      return {
        ...preve,
        image: [...preve.image, uploadImageCloudinary.url],
      };
    });

  };

  const handleDeleteImage = (index) => {
    const newProductImage=[...product.image]
    newProductImage.splice(index , 1)
    setProduct((preve) => {
      return {
        ...preve,
        image: [...newProductImage],
      };
    });
  };
  
  return(    <div className="product-upload-box">
  <div className="cross-icon" onClick={onClose}>
    <GrClose />
  </div>
  <h2>Upload Product</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
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

    <div className="form-group">
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


    <div className="form-group">
      <label htmlFor="category">Category:</label>
      <select
        type="text"
        id="category"
        name="category"
        value={product.category}
        onChange={handleChange}
        required
      >
        {productCatagory.map((el, index) => {
          return <option value={el.value}>{el.label}</option>;
        })}
      </select>
    </div>
    <div className="form-group">
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
    <div className="form-group">
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={product.description}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
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
    <div className="form-group">
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
    <div className="form-group">
      <label htmlFor="image">Image URL:</label>
      <label htmlFor="image">
        <div className="upload_image">
          <div className="image-box">
            <MdCloudUpload className="upload_icon" />
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
    <div className="uploded_image_div">
      {product?.image[0] ? (
        <div className="images_container">
          {product.image.map((el , index) => {
            return (
              <div className="uploaded_image">
                <div className="delete_image" onClick={()=>handleDeleteImage(index)}>
                  <GrClose />
                </div>

                <img
                  src={el}
                  width={80}
                  height={80}
                  className=""
                  alt=""
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{color:"red"}}> *Please Upload Product Image</p>
      )}
    </div>

    <button type="submit">Upload</button>
  </form>
</div>)
}

export default EditAdminProduct;