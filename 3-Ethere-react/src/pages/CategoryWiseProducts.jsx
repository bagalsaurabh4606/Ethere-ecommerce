
import { useDispatch, useSelector } from "react-redux"
import fetchproductOne from "../helper/fetchCategoryProduct"
import { useEffect, useState } from "react"
import { fabricAction } from "../store/fabric"
import FabricItems from "../components/FabricItems"
import { useParams } from "react-router-dom"
import CatagoryList from "../components/CatagoryList"



const CategoryWiseProducts=()=>{

const dispatch=useDispatch()
  // const [item,setData]=useState([])
  const [loading , setLoading]=useState(false)
  const { category } = useParams()
  console.log("params",category)
  const products = useSelector((state) => state.fabric.products || []);
  const fetchData=async()=>{
    const categoryProduct=await fetchproductOne(category)

    console.log("got or f*** up",categoryProduct)


    if(categoryProduct.success){
      console.log("a raha hai bahi")
      dispatch(fabricAction.addInitialItemsFabric(categoryProduct?.data))
    }
  }

  useEffect(()=>{
    fetchData()
  },[category])
  
  
  const items = products.filter((item) => item.category === category);

  console.log("slkdfjsaf",items)
  return (
    <main>
      <CatagoryList/>
      <div className="items-container">
        {items.map((item) => (
          <FabricItems key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
  
 
 }
 
 export default CategoryWiseProducts


// import { useDispatch, useSelector } from "react-redux";
// import fetchproductOne from "../helper/fetchCategoryProduct";
// import { useEffect, useState } from "react";
// import { fabricAction } from "../store/fabric";
// import FabricItems from "../components/FabricItems";
// import { useParams } from "react-router-dom";

// const CategoryWiseProducts = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const { category } = useParams();

//   const fetchData = async () => {
//     setLoading(true);
//     const categoryProduct = await fetchproductOne(category);

//     if (categoryProduct.success) {
//       dispatch(fabricAction.addInitialItemsFabric({
//         category,
//         items: categoryProduct.data,
//       }));
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, [category]);

//   const items = useSelector((store) => store.fabric[category] || []);

//   return (
//     <main>
//       <div className="items-container">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           items.map((item) => <FabricItems key={item.id} item={item} />)
//         )}
//       </div>
//     </main>
//   );
// };

// export default CategoryWiseProducts;
