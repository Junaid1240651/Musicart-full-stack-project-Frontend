import React from "react";
import "./BackToProductPageBtn.css";
import { useNavigate } from "react-router-dom";
const BackToProductPageBtn = () => {
  const navigate = useNavigate();
  const BackToProductPageBtnHandler = () => {
    navigate(-1);
  };

  return (
    <div className="backButtonDiv">
      <button onClick={BackToProductPageBtnHandler}>Back To Products</button>
    </div>
  );
};

export default BackToProductPageBtn;
