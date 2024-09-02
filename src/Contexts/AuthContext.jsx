import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const auth = createContext();

// eslint-disable-next-line react/prop-types
function AuthContext({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <auth.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </auth.Provider>
  );
}

export default AuthContext;
