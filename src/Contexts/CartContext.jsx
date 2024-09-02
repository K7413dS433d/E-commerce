import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { auth } from "./AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
export const userCart = createContext();

// eslint-disable-next-line react/prop-types
function CartContext({ children }) {
  //whole cart data}
  const [cartData, setCartData] = useState(null);
  // num of cart items
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  //cart is loading
  const [cartLoading, setCartLoading] = useState(false);

  //get token from auth context to run use effect after login
  const { token } = useContext(auth);

  //get user cart
  async function getUserCart() {
    setCartLoading(true);
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setCartData(res?.data);
      setNumOfCartItems(res?.data.numOfCartItems);
    } catch (error) {
      //api returns 404 if cart is empty
      // setCartData(null);
      toast.error("Error getting cart data");
    }
    setCartLoading(false);
  }

  //add item to cart
  async function addItemToCart(productId) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setCartData(res?.data);
      setNumOfCartItems(res?.data.numOfCartItems);
    } catch (error) {
      toast.error("Error adding item to cart");
    }
  }

  //update item quantity
  async function updateItemQuantity(productId, quantity) {
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: quantity },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setCartData(res?.data);
    } catch (error) {
      toast.error("Error updating item quantity");
    }
  }

  //remove item from cart
  async function removeItem(productId) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setCartData(res?.data);
      setNumOfCartItems(res?.data.numOfCartItems);
    } catch (error) {
      toast.error("Error removing item from cart");
    }
  }

  //clear cart
  async function clearCart() {
    try {
      await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("token") },
      });
      setCartData(null);
      setNumOfCartItems(0);
    } catch (error) {
      toast.error("Error clearing cart");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserCart();
    }
  }, [token]);
  return (
    <userCart.Provider
      value={{
        cartData,
        numOfCartItems,
        cartLoading,
        getUserCart,
        addItemToCart,
        updateItemQuantity,
        removeItem,
        clearCart,
        setCartData,
        setNumOfCartItems,
      }}
    >
      {children}
    </userCart.Provider>
  );
}

export default CartContext;
