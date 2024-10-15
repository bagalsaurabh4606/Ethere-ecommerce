import React, { useState } from "react";
import { IoPersonSharp, IoBag } from "react-icons/io5";
import { ImHeart } from "react-icons/im";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../styles/Header.module.css"; // Adjusted import path

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const bag = useSelector((store) => store.bag.bagProducts);
  const user = useSelector((store) => store?.user?.data);
  const searchInput = useLocation();
  const [search, setSearch] = useState(searchInput?.search?.split("=")[1]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.logo_container}>
        <Link to="">
          <img className={styles.myntra_home} src="images/ethere_logo.jpg" alt="" />
        </Link>
      </div>

      <div className={styles.search_bar}>
        <span className={styles.search_icon}>
          <FiSearch />
        </span>
        <input
          className={styles.search_input}
          placeholder="Search for products, brands and more"
          onChange={handleSearch}
          value={search}
        />
      </div>

      <div className={styles.mobile_menu_icon} onClick={toggleMenu}>
        ☰
      </div>

      <div className={`${styles.action_bar} ${menuOpen ? styles.menu_open : ""}`}>
        <span className={styles.close_menu_icon} onClick={toggleMenu}>
          <IoMdClose />
        </span>
        <Link
          className={styles.action_container}
          to={!user?._id ? "/login" : user.role === "ADMIN" ? "/admin-panel/all-users" : "/profile"}
        >
          <IoPersonSharp />
          <span className={styles.action_name}>
            {user && user.name ? (user.name.length > 6 ? user.name.substring(0, 6) + ".." : user.name) : "Login"}
          </span>
        </Link>

        <Link className={styles.action_container} to="/WishLists">
          <ImHeart />
          <span className={styles.action_name}>Favourite</span>
        </Link>

        <Link className={styles.action_container} to="/bag">
          <IoBag />
          <span className={styles.action_name}>Cart</span>
        </Link>

        <Link to="/bag" className={styles.bagitemcount}>
          {bag.length}
        </Link>
      </div>
    </header>
  );
};

export default Header;
