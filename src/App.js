import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Login from "../src/Pages/Login/Login";
import Register from "../src/Pages/Register/Register";
import Home from "../src/Pages/Home/Home";
import ProductDetailPage from "../src/Pages/ProductDetailPage/ProductDetailPage";
import Cart from "../src/Pages/Cart/Cart";
import CheckOutPage from "../src/Pages/CheckOutPage/CheckOutPage";
import SuccessPage from "../src/Pages/SuccessPage/SuccessPage";
import { useCombinedContext } from "./contextApi/CombinedContextProvider ";
import React, { useEffect } from "react";
import { LoginAndJWTTokenCheck } from "./auth/LoginAndJWTTokenCheck";
function App() {
  const { isLogin } = useCombinedContext();
  const { verifyUser } = LoginAndJWTTokenCheck();

  console.log(isLogin);
  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="register"
            element={!isLogin ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="login"
            element={!isLogin ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/" element={<Home />} />
          <Route path="productdetails/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={isLogin ? <CheckOutPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/success"
            element={isLogin ? <SuccessPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default React.memo(App);
