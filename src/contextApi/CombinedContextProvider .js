// useCombinedContext.js
import React, { useMemo } from "react";
import { CartItemProvider, useCartItemContext } from "./cart";
import { IsLoginProvider, useIsLoginContext } from "./auth";

export const CombinedContextProvider = ({ children }) => {
  return (
    <CartItemProvider>
      <IsLoginProvider>{children}</IsLoginProvider>
    </CartItemProvider>
  );
};

export const useCombinedContext = () => {
  const cartContext = useCartItemContext();
  const authContext = useIsLoginContext();

  const combinedContext = useMemo(() => {
    return {
      ...cartContext,
      ...authContext,
    };
  }, [cartContext, authContext]);

  return combinedContext;
};
