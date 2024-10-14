import React from "react";
import styles from "../styles/Footer.module.css"; // Adjust the path as necessary

const Footer = () => {
  return (
    <footer>
      <hr />
      <div className={styles.copyright}>
        © 2024 www.etherebyshreyas.in. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
