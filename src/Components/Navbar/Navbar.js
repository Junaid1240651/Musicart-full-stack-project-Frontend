import React, { useEffect } from "react";
import "./Navbar.css";
import MusicLogo from "../../images/musicLogo.png";
import CartImage from "../../images/cartImage.png";
import { useNavigate } from "react-router-dom";
import { FetchCartProduct } from "../../FetchCartProduct/FetchCartProduct";
import { useCombinedContext } from "../../contextApi/CombinedContextProvider ";
const Navbar = () => {
  const navigate = useNavigate();
  const { getCartItem } = FetchCartProduct();
  const { isLogin, cartItem } = useCombinedContext();

  useEffect(() => {
    if (isLogin === true) {
      getCartItem();
    }
  }, [isLogin]);
  return (
    <div className="navbar-container">
      <div className="logo-container">
        <img src={MusicLogo} onClick={() => navigate("/")} alt="" />
        <p className="brand-name" onClick={() => navigate("/")}>
          Musicart
        </p>
        <p className="nav-item">Home</p>
      </div>
      {isLogin ? (
        <div
          className="ghijcds"
          onClick={() => {
            getCartItem();
            navigate("/cart");
          }}
        >
          <img alt="" src={CartImage} />
          <button>{cartItem ? cartItem.length : 0}</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default React.memo(Navbar);
