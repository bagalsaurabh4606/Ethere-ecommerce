import { IoPersonSharp, IoBag, IoSearchOutline } from "react-icons/io5";
import { ImHeart } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import ProfileSidebar from "./ProfileSidebar";


import React, { useEffect, useState } from "react";

const Header = ({ fetchbagproduct, fetchcartproduct }) => {
  const bag = useSelector((store) => store.bag);
  const [baglength, setbaglength] = useState(0);
  const user = useSelector((store) => store?.user?.data);

  const searchInput =useLocation();

  const [search,setSearch]=useState(searchInput?.search?.split("=")[1]);

  useEffect(() => {
    fetchbagproduct();
  }, [fetchbagproduct]);

  useEffect(() => {
    setbaglength(bag.length);
  }, [bag]);

 const navigate =useNavigate();
  const handleSearch =(e)=>
  {
    const {value}=e.target;
    setSearch(value);
    if(value)
    {
      navigate(`/search?q=${value}`)
    }
    else 
    {
      navigate("/search")
    }
     

  }
  return (
    <>
      <header>
        <div className="logo_container">
          <Link to="">
            <img className="myntra_home" src="images/ethere_logo.jpg" alt="" />
          </Link>
        </div>
        {/* <nav className="nav_bar">
  <div className="dropdown">
    <Link to="/">Earrings</Link>
    <div className="dropdown-content">
      <Link to="/product-catagory/fabric">Fabric</Link>
      <Link to="/Earrings/hoops">Hoops</Link>
      <Link to="/Earrings/polymer">Polymer</Link>
    </div>
  </div>

  <div className="dropdown">
    <Link to="/">Scrunchies</Link>
    <div className="dropdown-content">
      <Link to="/scrunchies/satin">Satin</Link>
      <Link to="/scrunchies/organza">Organza</Link>
    </div>
  </div>

  <Link to="/">Wrist Charms</Link>
 
  <Link to="/">
    Key Chains <sup>New</sup>
  </Link>
</nav> */}

        <div className="search_bar">
          <span className="search_icon ">
            <FiSearch />
          </span>
          <input
            className="search_input"
            placeholder="Search for products, brands and more"
            onChange={handleSearch}
            value={search}
          />
        </div>
        <div className="action_bar">
          <Link
            className="action_container"
            to={
              !user?._id
                ? "/login"
                : user.role === "ADMIN"
                ? "/admin-panel/all-users"
                : "/profile"
            }
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <IoPersonSharp />

            <span className="action_name">
              {user && user.name
                ? user.name.length > 6
                  ? user.name.substring(0, 6) + ".."
                  : user.name
                : "Login"}
            </span>
          </Link>

          <Link
            className="action_container"
            to="/WishList"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ImHeart />
            <span className="action_name">favourite</span>
          </Link>

          <Link
            className="action_container"
            to="/bag"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <IoBag />
            {/* <sup>{bag.length}</sup> */}

            <span className="action_name">Store</span>
          </Link>
          <span className="bag-item-count">{baglength}</span>
        </div>
      </header>
    </>
  );
};

export default Header;

{
  /* <nav className="nav_bar">
<Link to="/">Earings</Link>
<Link to="/admin-panel">Polymer</Link>
<Link to="/">Hoops</Link> 
<Link to="/">Scrunchies</Link>
<Link to="/">Key Chains</Link>

<Link to="/">
Wrist Charms <sup>New</sup>
</Link>
</nav> */
}
