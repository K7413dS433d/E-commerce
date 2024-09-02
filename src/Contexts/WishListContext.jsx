import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { auth } from "./AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
export const userWishList = createContext();

// eslint-disable-next-line react/prop-types
function WishListContext({ children }) {
  // whole wishlist data
  const [wishListData, setWishListData] = useState(null);
  // num of wishlist items
  const [numOfWishListItems, setNumOfWishListItems] = useState(0);
  //wishlist is loading
  const [wishListLoading, setWishListLoading] = useState(false);
  //get all wishlist items ids to solve backend issue
  const [wishListIDs, setWishListIDs] = useState();

  //get token from auth context to run use effect after login
  const { token } = useContext(auth);

  //get use wishlist
  async function getWishList() {
    setWishListLoading(true);
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setWishListData(res?.data);
      setNumOfWishListItems(res?.data.count);
      setWishListIDs(res?.data.data.map((product) => product._id));
    } catch (error) {
      toast.error("Error getting wishlist");
    }
    setWishListLoading(false);
  }

  //add item to wishlist
  async function addItemToWishList(productId) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setNumOfWishListItems(res?.data.data.length);
      setWishListIDs(res?.data.data);
    } catch (error) {
      toast.error("Error adding item to wishlist");
    }
  }

  //remove item from wishlist
  async function removeWishListItem(productId) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setNumOfWishListItems(res?.data.data.length);
      setWishListIDs(res?.data.data);
    } catch (error) {
      toast.error("Error removing item from wishlist");
    }
  }

  useEffect(() => {
    //get user wishlist on mount
    if (localStorage.getItem("token")) {
      getWishList();
    }
  }, [token]);

  return (
    <userWishList.Provider
      value={{
        wishListData,
        numOfWishListItems,
        wishListLoading,
        wishListIDs,
        getWishList,
        addItemToWishList,
        removeWishListItem,
      }}
    >
      {children}
    </userWishList.Provider>
  );
}

export default WishListContext;
