import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import summaryApi from "../comman";
import styles from "../styles/OrderDetails.module.css"; // Import the CSS module

const OrderDetails = () => {
  const { orderId } = useParams(); // Extract orderId from URL parameters
  const [orderData, setOrderData] = useState(null); // State to store order data

  // Function to fetch order details from the API
  const fetchOrder = async () => {
    try {
      const response = await fetch(summaryApi.getOrder.url, {
        method: summaryApi.getOrder.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
      });
      const dataResponse = await response.json();
      setOrderData(dataResponse.data); // Set the fetched order data
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  // Fetch order data when the component mounts
  useEffect(() => {
    fetchOrder();
  }, []);

  // Find the specific order using the orderId
  const order = orderData?.find((order) => order.orderId === orderId);

  // Display a message if the order is not found or still loading
  if (!order) {
    return <p>Order not found or still loading...</p>;
  }

  const { products } = order;

  return (
    <div>
      <h2>Order Summary</h2>
      
      {/* Display the list of products in the order */}
      {products.length > 0 ? (
        products.map((item) => {
          // Calculate the discounted price
          const currentPrice =
            item.originalPrice - (item.originalPrice / 100) * item.discountPercentage;
          return (
            <div className={styles.bagItemContainer} key={item.id}>
              <div className={styles.itemLeftPart}>
                <img className={styles.bagItemImg} src={item.image} alt={item.name} />
              </div>
              <div className={styles.itemRightPart}>
                <div className={styles.companyName}>{item.company}</div>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.priceContainer}>
                  <span className={styles.currentPrice}>
                    Rs {Math.round(currentPrice)}
                  </span>
                  <span className={styles.originalPrice}>
                    Rs {item.originalPrice}
                  </span>
                  <span className={styles.discountPercentage}>
                    ({item.discountPercentage}% OFF)
                  </span>
                </div>
                <div className={styles.returnPeriod}>
                  <span className={styles.returnPeriodDays}>
                    {item.return_period} days
                  </span>{" "}
                  return available
                </div>
                <div className={styles.deliveryDetails}>
                  Delivery by
                  <span className={styles.deliveryDetailsDays}>
                    {item.delivery_date}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No products found for this order.</p>
      )}
    </div>
  );
};

export default OrderDetails;
