// useIsLoginContext.js

import { createContext, useContext, useMemo, useState } from "react";

export const IsLoginContext = createContext(null);

export const useIsLoginContext = () => {
  const context = useContext(IsLoginContext);
  if (!context) {
    throw new Error("useIsLoginContext must be used within an IsLoginProvider");
  }
  return context;
};

export const IsLoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const contextValue = useMemo(
    () => ({ isLogin, setIsLogin }),
    [isLogin, setIsLogin]
  );
  return (
    <IsLoginContext.Provider value={contextValue}>
      {children}
    </IsLoginContext.Provider>
  );
};
