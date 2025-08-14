import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Bag from "./routes/Bag.jsx";
import Home from "./routes/Home.jsx";
import { Provider } from "react-redux";
import ethereStore from "./store/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import WishListpage from "./routes/WishListpage.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ProfileSidebar from "./components/ProfileSidebar.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import Allusers from "./pages/Allusers.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import CatagoryWiseProducts from "./components/CatagoryList.jsx";
import CategoryWiseProducts from "./pages/CategoryWiseProducts.jsx";
import SearchProduct from "./pages/SearchProduct.jsx";
import PaymentSuccessful from "./pages/PaymentSuccessful.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import AdminAllOrders from "./components/AdminAllOrders.jsx";
import OtpVerification from "./pages/OtpVerification.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ProductDetailsPage from "./components/ProductsDetailsOverlay.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      { path: "bag", element: <Bag></Bag> },
      { path: "/", element: <Home></Home> },
      {
        path: "WishLists",
        element: <WishListpage></WishListpage>,
      },
      { path: "search", element: <SearchProduct /> },

      { path: "signup", element: <SignUp></SignUp> },
      { path: "payment-success", element: <PaymentSuccessful /> },
      { path: "login", element: <Login></Login> },
      { path: "forgot-password", element: <ForgotPassword></ForgotPassword> },
      { path: "forgot-password", element: <ForgotPassword></ForgotPassword> },
      { path: "/otp-verification/:userEmail", element: <OtpVerification/> },
      { path: "reset-password/:userEmail/:token", element: <ResetPassword/>},

      { path: "/profile", element: <ProfileSidebar/>},
    
      {
        path: "product-category/:category",
        element: <CategoryWiseProducts />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,

        children: [
          { path: "all-users", element: <Allusers /> },
          { path: "all-products", element: <AllProducts /> },
          { path: "all-orders", element: <AdminAllOrders /> },
        ],
      },
      {
        path: "order-details/:orderId",
        element: <OrderDetails></OrderDetails>,
      },
      {
        path:"product_hower/:productId",
        element:<ProductDetailsPage></ProductDetailsPage>
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={ethereStore}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);




