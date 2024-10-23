
import { useEffect, useState } from "react";
import summaryApi from "../comman";
import moment from "moment";
import styles from "../styles/AdminAllOrders.module.css";
import { toast } from "react-toastify";

const AdminAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchAllOrders = async () => {
    try {
      const response = await fetch(summaryApi.adminAllOrders.url, {
        method: summaryApi.adminAllOrders.method,
        credentials: "include",
      });
      const dataResponse = await response.json();
      console.log("Data response in admin all orders", dataResponse);
      setOrders(dataResponse.data); // Set orders from database
      if(dataResponse.success){
        toast.success(dataResponse.message)
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to handle checkbox change
  const handleCheckboxChange = async (orderId, isChecked) => {
    // Optimistically update local state
    const updatedOrders = orders.map((order) =>
      order._id === orderId ? { ...order, orderPacked: isChecked } : order
    );
    setOrders(updatedOrders); // Update local state for instant feedback

    try {
      // API call to update the orderPacked status in the database
      const response = await fetch(`${summaryApi.OrderStatus.url}/${orderId}`, {
        method: summaryApi.OrderStatus.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ orderPacked: isChecked }),
      });

      const responseData = await response.json();

      if (!responseData.success) {
        // If there's an error, revert local state change
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, orderPacked: !isChecked } // Revert change
              : order
          )
        );
        console.log("Error updating order status:", responseData.error);
      }
       fetchAllOrders();
    } catch (error) {
      // If there's an error, revert local state change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderPacked: !isChecked } : order
        )
      );
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);


  

  // Group orders by date
  const groupedOrders = orders.reduce((acc, order) => {
    const date = moment(order.createdAt).format("MMMM Do YYYY");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(order);
    return acc;
  }, {});

  if (loading) {
    return <div>Loading orders...</div>; // Loading feedback
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>All Orders</h2>
      {Object.keys(groupedOrders).map((date) => (
        <div key={date} className={styles.dateGroup}>
          <h3 className={styles.dateTitle}>{date}</h3>
          <div className={styles.ordersContainer}>
            {groupedOrders[date].map((order) => (
              <div
                key={order._id}
                className={`${styles.orderItem} ${
                  order.orderPacked ? styles.delivered : ""
                }`}
              >
                <div className={styles.checkboxContainer}>
                  
                  <p>Mark as Packed</p>
                  <input
                    type="checkbox"
                    style={{"cursor": "pointer"}}
                    checked={order.orderPacked || false} // Reflect the stored value
                    onChange={(e) =>
                      handleCheckboxChange(order._id, e.target.checked)
                    }
                  />
                </div>
                <p>
                  <strong>Order ID:</strong> {order.orderId}
                </p>
                <p>
                  <strong>User ID:</strong> {order.userId}
                </p>
                <p>
                  <strong>Email:</strong> {order.email}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}
                </p>
                <p>
                  <strong>Payment Status:</strong> {order.paymentStatus}
                </p>
                <div className={styles.productsList}>
                  <strong>Products:</strong>
                  <div className={styles.productCardsContainer}>
                    {order.products.map((product, index) => (
                      <div key={index} className={styles.productCard}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className={styles.productImage}
                        />
                        <div className={styles.productInfo}>
                          <h4 className={styles.productName}>{product.name}</h4>
                          <p className={styles.productDescription}>
                            {product.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminAllOrders;
