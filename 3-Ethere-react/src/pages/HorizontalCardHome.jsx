import { useSelector } from "react-redux";
import HorizontalCardItems from "../components/HorizontalCardItems";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";

const HorizontalCardHome = ({ category }) => {
  const products = useSelector((state) => state.items.products || []); // Get products from Redux state
  const items = products.filter((item) => item.category === category); // Filter products by the provided category

  return (
    <div className="horizontal-items-container-main">
      {/* Link to navigate to the category-specific product page */}
      <Link className="horizontal-title" to={`/product-category/${category}`}>
        {category}
      </Link>

      {/* Display items in a horizontal scrollable list */}
      <div className="horizontal-items-container">
        {items.map((item, index) => (
          <HorizontalCardItems key={item.id || index} item={item} />
        ))}
      </div>

      {/* Link to see more items in the selected category */}
      <Link className="horizontal-see-more-overlay" to={`/product-category/${category}`}>
        <div className="horizontal-see-more-text">
          See More <MdArrowForwardIos />
        </div>
      </Link>
    </div>
  );
};

export default HorizontalCardHome;
