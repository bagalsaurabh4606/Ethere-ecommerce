import { useSelector } from "react-redux";
import WishListItem from "../components/WishListItem";
import WishlistMessage from "../components/WishlistMessage";
import styles from "../styles/WishListPage.module.css"; // Adjust the path as necessary

const WishListPage = () => {
  const wishItems = useSelector((state) => state.wishlist.wishProducts);
  const items = useSelector((state) => state.items.products);

  const FinalItems = items.filter((item) => 
    wishItems.some((wishId) => wishId.id === item.id)
  );

  return (
    <main>
      {FinalItems.length === 0 ? (
        <WishlistMessage />
      ) : (
        <div className={styles.wishlistItemsContainer}>
          {FinalItems.map((item) => (
            <WishListItem item={item} key={item.id} />
          ))}
        </div>
      )}
    </main>
  );
};

export default WishListPage;
