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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      { path: "bag", element: <Bag></Bag> },
      { path: "/", element: <Home></Home> },
      {
        path: "WishList",
        element: <WishListpage></WishListpage>,
      },
      { path: "search", element: <SearchProduct/> },


      { path: "signup", element: <SignUp></SignUp> },
      { path: "login", element: <Login></Login> },
      { path: "forgot-password", element: <ForgotPassword></ForgotPassword> },
      { path: "Profile", element: <ProfileSidebar></ProfileSidebar> },
      {
        path: "product-catagory/:category",
        element: <CatagoryWiseProducts />,
      },
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
        ],
      },
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
