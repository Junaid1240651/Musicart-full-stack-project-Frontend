// useCartItemContext.js

import { createContext, useContext, useMemo, useState } from "react";

export const CartItemContext = createContext(null);

export const useCartItemContext = () => {
  const context = useContext(CartItemContext);
  if (!context) {
    throw new Error(
      "useCartItemContext must be used within a CartItemProvider"
    );
  }
  return context;
};

export const CartItemProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const contextValue = useMemo(
    () => ({ cartItem, setCartItem }),
    [cartItem, setCartItem]
  );

  return (
    <CartItemContext.Provider value={contextValue}>
      {children}
    </CartItemContext.Provider>
  );
};
