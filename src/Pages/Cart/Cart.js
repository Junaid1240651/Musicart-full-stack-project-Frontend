import React, { useEffect, useState } from "react";
import OfferNavbar from "../../Components/OfferNavbar/OfferNavbar";
import Navbar from "../../Components/Navbar/Navbar";
import BackToProductPageBtn from "../../Components/BackToProductPageBtn/BackToProductPageBtn";
import "./Cart.css";
import searchImage from "../../images/searchImage.png";
import cartBagImage from "../../images/cartBagImage.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import { FetchCartProduct } from "../../FetchCartProduct/FetchCartProduct";
import Footer from "../../Components/Footer/Footer";
import { useCombinedContext } from "../../contextApi/CombinedContextProvider ";

const Cart = () => {
  const { cartItem } = useCombinedContext();
  const { getCartItem } = FetchCartProduct();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [btnClick, setbtnClick] = useState();
  const [btnId, setbtnId] = useState();
  const [totalCartAmount, setTotalCartAmount] = useState();
  const [userEmail, setUserEmail] = useState();
  const token = localStorage.getItem("LoginJwtToken");

  const cartQuantityHandler = async (id, index3) => {
    setbtnClick(true);
    setbtnId(id);
    try {
      await axios.post(
        "http://localhost:3000/getCartProduct",
        {
          productQuantity: index3,
          cartUpdateId: id,
          userEmail: userEmail.replace(/"|'/g, ""),
        },
        {
          headers: {
            Authorization: token.replace(/"/g, ""),
          },
        }
      );

      getCartItem();
      setbtnClick(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const placeOrderHandler = async () => {
    setLoading2(true);
    try {
      await axios.post(
        "http://localhost:3000/checkOutProduct",
        {
          placeOrderHandler: "placeOrderHandler",
        },
        {
          headers: {
            Authorization: token.replace(/"/g, ""),
          },
        }
      );

      setLoading2(false);
      navigate("/checkout");
    } catch (error) {
      alert(error.message);
    }
  };
  const totalCartamount = () => {
    let totalAmount = 0;
    if (cartItem) {
      cartItem.map((data) => {
        totalAmount += Number(
          data.productQuantity * data.productPrice.replace(/\,/g, "")
        );
      });
    }
    setLoading(true);

    setTotalCartAmount(totalAmount);
  };
  useEffect(() => {
    totalCartamount();
  }, [cartItem, btnClick]);

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"));
  }, []);
  const cartRemoveHandler = async (e) => {
    const productId = e.target.id;
    try {
      const response = await axios.post(
        "http://localhost:3000/removeCartProduct",
        {
          productId: productId,
        },
        {
          headers: {
            Authorization: token.replace(/"/g, ""),
          },
        }
      );
      alert(response.data);
      getCartItem();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <OfferNavbar />
      <Navbar />
      <div>
        {loading === true ? (
          <div>
            <div className="searchContainer">
              <div className="searchDiv">
                <div className="search">
                  <img src={searchImage} />
                  <input placeholder="Search You Headphone Here" type="text" />
                </div>
              </div>
            </div>
            <div className="viewCartContainer">
              <BackToProductPageBtn />

              <div className="cartImgDiv">
                <img src={cartBagImage} />
                <p>My Cart</p>
              </div>
              {cartItem && cartItem.length > 0 ? (
                <div>
                  {cartItem ? (
                    <div className="cartItemListContainer">
                      <div className="artItemListDiv">
                        <hr className="hrLine" />
                        {cartItem
                          ? cartItem.map((data) => (
                              <div>
                                <div className="productDiv">
                                  <div>
                                    <img
                                      alt=""
                                      onClick={() =>
                                        navigate("/productdetails/" + data._id)
                                      }
                                      src={data.productImage[0]}
                                    />
                                  </div>
                                  <div className="cartDetails">
                                    <p>{data.productName}</p>
                                    <p>Clour : {data.productColor}</p>
                                    <p>
                                      {data.productStock === true
                                        ? "In Stock"
                                        : "Out Of Stock"}
                                    </p>
                                  </div>
                                  <div className="priceDiv">
                                    <p>Price</p>
                                    <p>₹{data.productPrice}</p>
                                  </div>
                                  <div className="QuantityDiv">
                                    <p>Quantity</p>
                                    <div className="dropdownContainerr">
                                      <div className="dropdownn">
                                        {btnClick === true &&
                                        btnId === data._id ? (
                                          <button>
                                            <i class="fa fa-spinner fa-spin"></i>
                                          </button>
                                        ) : (
                                          <button>
                                            {data.productQuantity
                                              ? data.productQuantity
                                              : "Select"}
                                          </button>
                                        )}

                                        <div className="dropdown-contentt">
                                          <p
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 1)
                                            }
                                          >
                                            1
                                          </p>
                                          <p
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 2)
                                            }
                                          >
                                            2
                                          </p>
                                          <p
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 3)
                                            }
                                          >
                                            3
                                          </p>
                                          <p
                                            id="4"
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 4)
                                            }
                                          >
                                            4
                                          </p>
                                          <p
                                            id="5"
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 5)
                                            }
                                          >
                                            5
                                          </p>
                                          <p
                                            id="6"
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 6)
                                            }
                                          >
                                            6
                                          </p>
                                          <p
                                            id="7"
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 7)
                                            }
                                          >
                                            7
                                          </p>
                                          <p
                                            id="8"
                                            onClick={() =>
                                              cartQuantityHandler(data._id, 8)
                                            }
                                          >
                                            8
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="totalPriceDiv">
                                    <p>Total</p>
                                    <p>
                                      ₹
                                      {Number(
                                        data.productPrice.replace(/\,/g, "")
                                      ) * data.productQuantity}
                                    </p>
                                  </div>
                                  <div className="cartItemRemove">
                                    <p>Remove</p>
                                    <button
                                      id={data._id}
                                      onClick={cartRemoveHandler}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                                <hr className="hrLine" />
                              </div>
                            ))
                          : ""}
                      </div>
                      <div className="placeOrderContainer">
                        <div className="placeOrderDiv">
                          <p className="reghsw">PRICE DETAILS</p>
                          <div className="totalMRPDiv">
                            <div>
                              <p>Total MRP</p>
                              <p>Discount on MRP</p>
                              <p>Convenience Fee</p>
                            </div>
                            <div>
                              <p>₹₹{totalCartAmount ? totalCartAmount : ""}</p>
                              <p>₹0</p>
                              <p>₹45</p>
                            </div>
                          </div>
                          <div>
                            <div className="totalAmtDiv">
                              <p>Total Amount</p>
                              <p>
                                ₹{totalCartAmount ? totalCartAmount + 45 : ""}
                              </p>
                            </div>
                            <div className="placeOrder">
                              {loading2 === true ? (
                                <button>
                                  <i class="fa fa-spinner fa-spin"></i>
                                  Loading
                                </button>
                              ) : (
                                <button onClick={placeOrderHandler}>
                                  Place Order
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <LoadingScreen />
                  )}
                </div>
              ) : (
                <p className="eaqwiuiuweqewqqasxaS">Cart Is Empty🙁</p>
              )}
            </div>
            <button className="ASDFIJKOH" onClick={() => navigate(-1)}>
              🡠{" "}
            </button>
            <div className="asdikergq">
              {cartItem ? (
                <div className="ADESFOIPSE">
                  {cartItem.map((data) => (
                    <div className="ioeiow">
                      <div className="ASEFOIS">
                        <img
                          alt=""
                          className="qfghjm"
                          onClick={() =>
                            navigate("/productdetails/" + data._id)
                          }
                          src={data.productImage[0]}
                        />
                      </div>

                      <div className="ASDFKJASD">
                        <div className="SAIOO">
                          <p>{data.productName}</p>

                          <p>₹{data.productPrice}</p>
                          <p>Clour : {data.productColor}</p>
                          <p>
                            {data.productStock === true
                              ? "In Stock"
                              : "Out Of Stock"}
                          </p>
                          <p>Convinance Fee ₹45</p>
                        </div>
                        <div className="totalDiv">
                          <p>Total:</p>
                          <p>
                            ₹{Number(data.productPrice.replace(/\,/g, "")) + 45}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="totalAmtDiv">
                    <p>
                      Total Amount ₹
                      {totalCartAmount ? totalCartAmount + 45 : ""}
                    </p>
                    {loading2 === true ? (
                      <button className="place-order">
                        <i class="fa fa-spinner fa-spin"></i>
                        Loading
                      </button>
                    ) : (
                      <button
                        className="place-order"
                        onClick={placeOrderHandler}
                      >
                        Place Order
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="noProduct">Cart Is Empty🙁</p>
              )}
            </div>
          </div>
        ) : (
          <LoadingScreen />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
