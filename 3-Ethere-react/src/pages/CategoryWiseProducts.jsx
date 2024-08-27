
import { useDispatch, useSelector } from "react-redux"
import fetchproductOne from "../helper/fetchCategoryProduct"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CatagoryList from "../components/CatagoryList"
import HomeItems from "../components/HomeItems"



const CategoryWiseProducts=()=>{
  const { category } = useParams()
  console.log("params",category)
  const products=useSelector((state)=>state.items.products || [])
  const [fileterdItem , setfilteredItem]=useState([])
  useEffect(()=>{
    const items = products.filter((item) => item.category === category);
    setfilteredItem(items)
  },[category,products])
  
  return (
    <main>
      <CatagoryList/>
     
      <div className="items-container">
        {fileterdItem.map((item) => (
          <HomeItems key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
  
 
 }
 
 export default CategoryWiseProducts
