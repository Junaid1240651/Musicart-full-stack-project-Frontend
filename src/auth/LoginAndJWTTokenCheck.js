import axios from "axios";
import { useCombinedContext } from "../contextApi/CombinedContextProvider ";

export const LoginAndJWTTokenCheck = () => {
  const { setIsLogin, setCartItem } = useCombinedContext();

  const verifyUser = async () => {
    try {
      const token = localStorage.getItem("LoginJwtToken");

      if (token) {
        const userVerify = await axios.get(
          "https://musicart-full-stack-project-backend.onrender.com/verifyUser",
          {
            headers: { Authorization: token.replace(/"/g, "") },
          }
        );

        if (userVerify.data === true) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    setCartItem([]);
    setIsLogin(false);
  };
  return { verifyUser, handleLogout };
};
