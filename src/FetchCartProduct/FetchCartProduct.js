import axios from "axios";
import { useCombinedContext } from "../contextApi/CombinedContextProvider ";

export const FetchCartProduct = () => {
  const { setCartItem } = useCombinedContext();
  const getCartItem = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const token = localStorage.getItem("LoginJwtToken");

    if (!userEmail) {
      return setCartItem([]);
    }

    try {
      const response = await axios.get("http://localhost:3000/getCartProduct", {
        headers: {
          Authorization: token.replace(/"/g, ""),
        },
      });

      setCartItem(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return { getCartItem };
};
