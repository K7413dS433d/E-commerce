import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { jwtDecode } from "jwt-decode";
import { auth } from "./AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
export const apiData = createContext();

// eslint-disable-next-line react/prop-types
function DataContext({ children }) {
  const { token } = useContext(auth);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  //get all products
  const { data: allProducts, isLoading: productsLoading } = useQuery(
    "products",
    async () => {
      return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }
  );

  //get all category names
  const { data: categoriesName, isLoading: categoriesLoading } = useQuery(
    "CategoryNames",
    async () => {
      return await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
    }
  );

  //get user name
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const { name, id } = jwtDecode(token);
      setUserName(name);
      setUserId(id);
    }
  }, [token]);

  return (
    <apiData.Provider
      value={{
        allProducts,
        productsLoading,
        categoriesName,
        categoriesLoading,
        userName,
        setUserName,
        userId,
      }}
    >
      {children}
    </apiData.Provider>
  );
}

export default DataContext;
