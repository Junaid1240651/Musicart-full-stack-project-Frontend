import React from "react";
import OfferNavbar from "../../Components/OfferNavbar/OfferNavbar";
import Navbar from "../../Components/Navbar/Navbar";
import BackToProductPageBtn from "../../Components/BackToProductPageBtn/BackToProductPageBtn";
import "./CheckOutPage.css";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchCartProduct } from "../../FetchCartProduct/FetchCartProduct";
import axios from "axios";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import Footer from "../../Components/Footer/Footer";
import { useCombinedContext } from "../../contextApi/CombinedContextProvider ";

const CheckOutPage = () => {
  const [totalCartAmount, setTotalCartAmount] = useState();
  const [userEmail, setUserEmail] = useState();
  const [checkOutCartDetailis, setCheckOutCartDetailis] = useState();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("LoginJwtToken");
  const { cartItem } = useCombinedContext();
  const { getCartItem } = FetchCartProduct();
  const navigate = useNavigate();

  const placeOrderHandler = async () => {
    setLoading(true);
    try {
      setLoading(true);

      await axios;
      const response = await axios.post(
        "http://localhost:3000/orderProduct",
        {
          email: userEmail.replace(/"|'/g, ""),
        },
        {
          headers: {
            Authorization: token.replace(/"/g, ""),
          },
        }
      );
      alert(response.data);
      navigate("/success");
      setLoading(false);

      cartProduct();
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"));
  }, []);
  useEffect(() => {
    checkOutProduct();
  }, [cartItem]);
  console.log("rstgfgtsdf");
  const cartProduct = async () => {
    const result = await FetchCartProduct();
    getCartItem(result);
  };
  const checkOutProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/checkOutProduct",
        {
          headers: {
            Authorization: token.replace(/"/g, ""),
          },
        }
      );
      console.log(response.data);
      setCheckOutCartDetailis(response.data);

      let total = 0;
      response.data.forEach((data) => {
        total +=
          Number(data.productQuantity ? data.productQuantity : 1) *
          Number(data.productPrice.replace(/\,/g, ""));
      });

      setTotalCartAmount(total);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <OfferNavbar />
      <Navbar />
      {checkOutCartDetailis ? (
        <div>
          <div className="checkOutContainer">
            <div>
              <BackToProductPageBtn />
            </div>
            <div className="checkoutText">
              <p>Checkout</p>
            </div>
            {checkOutCartDetailis && checkOutCartDetailis.length > 0 ? (
              <div className="checkOutItmeContainer">
                <div>
                  <div className="AddressDiv">
                    <p>1. Delivery address</p>
                    <p>
                      Akash Patel <br />
                      104 <br /> kk hh nagar, Lucknow <br />
                      Uttar Pradesh 226025
                    </p>
                  </div>
                  <hr />
                  <div className="paymentDiv">
                    <p>2. Payment method</p>
                    <p>Pay on delivery ( Cash/Card )</p>
                  </div>
                  <hr />
                  <div className="reviewDiv">
                    <p>3. Review items and delivery</p>

                    <div>
                      {checkOutCartDetailis
                        ? checkOutCartDetailis.map((data) => (
                            <div>
                              <img
                                className="productImg"
                                src={data.productImage[0]}
                              />
                              <p className="productName">{data.productName}</p>
                              <p className="productColor">
                                Clour : {data.productColor}
                              </p>
                              <p className="productColor">
                                {data.productStock === true
                                  ? "In Stock"
                                  : "Out Of Stock"}
                              </p>
                              <p className="deliveryTime">
                                Estimated delivery :<br /> Monday — FREE
                                Standard Delivery
                              </p>
                            </div>
                          ))
                        : ""}
                    </div>
                  </div>
                  <hr />
                  <div className="placeOrderDivv">
                    <div>
                      {loading === true ? (
                        <button>
                          <i class="fa fa-spinner fa-spin"></i>
                          Loading
                        </button>
                      ) : (
                        <button onClick={placeOrderHandler}>
                          Place your order
                        </button>
                      )}
                    </div>
                    <div>
                      <p>Order Total : ₹{totalCartAmount + 45}.00</p>
                      <p>
                        By placing your order, you agree to Musicart privacy
                        notice and conditions of use.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="placeOrderDiiv">
                  <div className="placeOrderInnerDiv">
                    {loading === true ? (
                      <button>
                        <i class="fa fa-spinner fa-spin"></i>
                        Loading
                      </button>
                    ) : (
                      <button onClick={placeOrderHandler}>
                        Place your order
                      </button>
                    )}
                    <p>
                      By placing your order, you agree to Musicart privacy
                      notice and conditions of use.
                    </p>
                  </div>

                  <hr />
                  <p className="placeOrderSummary">Order Summary</p>
                  <div className="itemDiv">
                    <div className="orderTotalaAmount">
                      <p>Items : </p>
                      <p>Delivery : </p>
                    </div>

                    <div className="orderTotalaAmount">
                      <p>₹{totalCartAmount}.00</p>
                      <p>₹45.00</p>
                    </div>
                  </div>
                  <hr />

                  <div className="orderTotalaAmt">
                    <p>Order Total : </p>
                    <p>₹{totalCartAmount + 45}.00</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="noProduct">No Product Avialble In Your Cart🙁</p>
            )}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
      <Footer />
    </div>
  );
};

export default CheckOutPage;
