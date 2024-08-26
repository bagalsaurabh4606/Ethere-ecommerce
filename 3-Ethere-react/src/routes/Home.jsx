import { useState } from "react";
import BannerImage from "../components/BannerImage";
import CatagoryList from "../components/CatagoryList";
const Home=()=>{
//   const [showCategorys , setshowCategorys]=useState(true)
//  const handleMouseenter=()=>{
// setshowCategorys(true)
//  }

//  const handleMouseleave=()=>{
//   setshowCategorys(false)
//  }
  return (
    <div>
      <div className="hover-category"
      // onMouseEnter={handleMouseenter}
      // onMouseLeave={handleMouseleave}
      >
        <h2>Ethere Products</h2>
        <CatagoryList/>
        {/* {showCategorys && <CatagoryList/>} */}
      </div>
      
      <BannerImage />
    </div>
  )
}
export default Home;
// import HomeItems from "../components/HomeItems";
// import { useSelector } from "react-redux";
// const Home = () => {
//   const items = useSelector((store) => store.items);


//   return (
//     <main>
//       <div className="items-container">
//         {items.map((item) => (
//           <HomeItems key={item.id} item={item} />
//         ))}
//       </div>
//     </main>
//   );
// };

// export default Home;
