import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import LogIn from "./Components/LogIn/LogIn";
import Register from "./Components/Register/Register";
import WishList from "./Components/WishList/WishList";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import NotFound from "./Components/NotFound/NotFound";
import AuthContext from "./Contexts/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClientProvider, QueryClient } from "react-query";
import DataContext from "./Contexts/DataContext";
import { SkeletonTheme } from "react-loading-skeleton";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContext from "./Contexts/CartContext";
import WishListContext from "./Contexts/WishListContext";
import CheckOut from "./Components/CheckOut/CheckOut";
import AllOrders from "./Components/AllOrders/AllOrders";
//forget password
import ForgetPasswordLayout from "./Components/ForgetPassword/ForgetPasswordLayout/Layout";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ForgetPassword/ResetPassword/ResetPassword";
import ContactUs from "./Components/ContactUs/ContactUs";
import UserProfile from "./Components/UserProfile/UserProfile";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/login", element: <LogIn /> },
      { path: "/register", element: <Register /> },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      { path: "/products", element: <Products /> },
      { path: "/categories", element: <Categories /> },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: "/brands", element: <Brands /> },
      //! here tell the route that id is not a static or page path it's a variable path
      { path: "/productDetails/:id", element: <ProductDetails /> },
      {
        path: "/checkOut/:id",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allOrders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      { path: "/contactUs", element: <ContactUs /> },
      //forget password try nested children :)
      {
        path: "/forgetPassword",
        element: <ForgetPasswordLayout />,
        children: [
          { index: true, element: <ForgetPassword /> },
          { path: "/forgetPassword/ResetPassword", element: <ResetPassword /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  const cashData = new QueryClient();

  return (
    <SkeletonTheme baseColor="#B5E3B5" highlightColor="#E6F6E6">
      <AuthContext>
        <QueryClientProvider client={cashData}>
          <WishListContext>
            <CartContext>
              <DataContext>
                <Toaster />
                <RouterProvider router={route} />
              </DataContext>
            </CartContext>
          </WishListContext>
        </QueryClientProvider>
      </AuthContext>
    </SkeletonTheme>
  );
}

export default App;
