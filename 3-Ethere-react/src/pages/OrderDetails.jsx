import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import summaryApi from "../comman";

const OrderDetails = () => {
  const { orderId } = useParams(); // Extract orderId from useParams
  const [orderData, setOrderData] = useState(null); // Initialize with null to check later
  console.log("orderID", orderId);
  const fetchOrder = async () => {
    try {
      const response = await fetch(summaryApi.getOrder.url, {
        method: summaryApi.getOrder.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
      });
      const dataResponse = await response.json();
      setOrderData(dataResponse.data); // Set the order data
      console.log("Data Response:", dataResponse.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []); // Fetch order only once when the component mounts

  console.log("Order Data:", orderData);

  // Only run find if orderData is not null/undefined
  const order = orderData?.find((order) => order.orderId === orderId);

  if (!order) {
    return <p>Order not found or still loading...</p>; // Handle case when order is not found or loading
  }

  const { products } = order;

  return (
    <div>
      <h2>Order Summary</h2>
    

      {products.length > 0 ? (
        products.map((item) => {
          const currentPrice = item.originalPrice - (item.originalPrice / 100) * item.discountPercentage;
          return (
            <>
              
              <div className="bag-item-container">
                <div className="item-left-part">
                  <img className="bag-item-img" src={item.image} />
                </div>
                <div className="item-right-part">
                  <div className="company">{item.company}</div>
                  <div className="item-name">{item.name}</div>
                  <div className="price-container">
                    <span className="current-price">
                      Rs {Math.round(currentPrice)}
                    </span>
                    <span className="original-price">
                      Rs {item.originalPrice}
                    </span>
                    <span className="discount-percentage">
                      ({item.discountPercentage}% OFF)
                    </span>
                  </div>
                  <div className="return-period">
                    <span className="return-period-days">
                      {" "}
                      {item.return_period} days
                    </span>{" "}
                    return available
                  </div>
                  <div className="delivery-details">
                    Delivery by
                    <span className="delivery-details-days">
                      {item.delivery_date}
                    </span>
                  </div>
                </div>
              </div>
              
            </>
          );
        })
      ) : (
        <p>No products found for this order.</p>
      )}
    </div>
  );
};

export default OrderDetails;
