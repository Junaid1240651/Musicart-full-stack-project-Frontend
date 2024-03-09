import React from "react";
import "./Footer.css";
import homeBtn from "../../images/homeBtn.png";
import loginBtn from "../../images/loginBtn.png";
import cartBtn from "../../images/cartBtn.png";
import { useNavigate } from "react-router-dom";
import { FetchCartProduct } from "../../FetchCartProduct/FetchCartProduct";
import { useCombinedContext } from "../../contextApi/CombinedContextProvider .js";

const Footer = () => {
  const navigate = useNavigate();
  const { isLogin } = useCombinedContext();

  const logoutHandler = () => {
    FetchCartProduct();
  };

  return (
    <div className="footer">
      <p>Musicart | All rights reserved</p>
      <div>
        <img alt="" src={homeBtn} onClick={() => navigate("/")} />
        <p>Home</p>
      </div>

      <div onClick={() => navigate("/cart")}>
        <img alt="" src={cartBtn} />

        <p>Cart</p>
      </div>

      <div onClick={logoutHandler}>
        <img alt="" src={loginBtn} />
        {isLogin === true ? (
          <p onClick={logoutHandler}>Logout</p>
        ) : (
          <p onClick={() => navigate("/login")}>Login</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(Footer);
