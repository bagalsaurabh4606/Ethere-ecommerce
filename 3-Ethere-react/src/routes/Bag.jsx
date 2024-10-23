import Footer from "../components/Footer";
import Header from "../components/Header";
import BagSummary from "../components/BagSummary";
import BagItem from "../components/BagItem";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import styles from "../styles/Bag.module.css"; // Importing the CSS module

const Bag = () => {
  const bagItems = useSelector((store) => store.bag.bagProducts);
  const items = useSelector((state) => state.items.products);

  const FinalItems = bagItems.map((bagItem) => {
    const correspondingItem = items.find((item) => item.id === bagItem.id);
    return {
      ...correspondingItem,
      quantity: bagItem.quantity,
    };
  });

 

  return (
    <main > {/* Use CSS module styles */}
      {FinalItems.length === 0 ? (
        <Message />
      ) : (
        <div className={styles.bagPage}>
          <div className={styles.bagItemsContainer}>
            {FinalItems.map((item) => (
              <BagItem item={item} key={item.id} />
            ))}
          </div>
          <div className={styles.bagSummary}>
            <BagSummary FinalItems={FinalItems} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Bag;
