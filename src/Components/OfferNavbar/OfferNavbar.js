import React, { useEffect, useState, memo } from "react";
import "./OfferNavbar.css";
import callImage from "../../images/callImage.png";
import { useNavigate } from "react-router-dom";
import { useCombinedContext } from "../../contextApi/CombinedContextProvider .js";
import { LoginAndJWTTokenCheck } from "../../auth/LoginAndJWTTokenCheck.js";

const OfferNavbar = () => {
  const { isLogin } = useCombinedContext();

  const navigate = useNavigate();
  const { handleLogout } = LoginAndJWTTokenCheck();

  const logoutHandler = () => {
    handleLogout();
  };

  return (
    <div className="mainContaainer">
      <div className="commonDiv">
        <img className="callImg" src={callImage} alt="" />
        <p>912121131313</p>
      </div>
      <div className="commonDiv">
        <div className="commonDiv">
          <p>Get 50% off on selected items</p>
          <div></div>
          <p>Shop Now</p>
        </div>
      </div>
      <div className="logout">
        {isLogin === true ? (
          <p onClick={logoutHandler}>Logout</p>
        ) : (
          <div>
            <p onClick={() => navigate("/login")}>Login</p>
            <p>|</p>
            <p onClick={() => navigate("/register")}>Signup</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(OfferNavbar);
