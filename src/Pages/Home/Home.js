import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import CartImage2 from "../../images/cartImage2.png";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import GirlImage from "../../images/girlImage.png";
import searchImage from "../../images/searchImage.png";
import gripViewImage from "../../images/gripViewImage.png";
import gripViewImage2 from "../../images/gripViewImage2.png";
import gripViewImage3 from "../../images/gripViewImage3.png";
import gripViewImage4 from "../../images/gripViewImage4.png";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OfferNavbar from "../../Components/OfferNavbar/OfferNavbar";
import Navbar from "../../Components/Navbar/Navbar";
import { FetchCartProduct } from "../../FetchCartProduct/FetchCartProduct";
import { useCombinedContext } from "../../contextApi/CombinedContextProvider ";
import { LoginAndJWTTokenCheck } from "../../auth/LoginAndJWTTokenCheck";

const Home = () => {
  const { isLogin } = useCombinedContext();

  const navigate = useNavigate();
  const [apidata, setApiData] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartId, setcartId] = useState();
  const [addToCartClick, setAddToCartClick] = useState(false);
  const [gridChange, setgridChange] = useState(true);
  const [headPhoneType, setHeadPhoneType] = useState([]);
  const [headPhoneColor, setheadPhoneColor] = useState([]);
  const [headPhonePrice, setHeadPhonePrice] = useState([]);
  const [companyType, seCompanyType] = useState([]);
  const [inputSearch, setinputSearch] = useState([]);
  const [userEmail, setUserEmail] = useState();
  const { getCartItem } = FetchCartProduct();
  const token = localStorage.getItem("LoginJwtToken");

  const fetchproduct = async () => {
    try {
      const response = await axios.get(
        "https://musicart-full-stack-project-backend.onrender.com",
        {
          params: {
            headPhoneType: headPhoneType,
            companyType: companyType,
            headPhoneColor: headPhoneColor,
            headPhonePrice: headPhonePrice,
            inputSearch: inputSearch,
          },
          headers: {
            Authorization: token,
          },
        }
      );
      setApiData(response.data);
      // console.log(response.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchproduct();
  }, [headPhoneType, companyType, headPhoneColor, headPhonePrice, inputSearch]);
  // useEffect(() => {
  //   LoginAndJWTTokenCheck();
  // }, []);
  useEffect(() => {});
  const resetFilterHandler = () => {
    setHeadPhoneType([]);
    setheadPhoneColor([]);
    setHeadPhonePrice([]);
    seCompanyType([]);
  };

  const inputSearchHandler = (e) => {
    setTimeout(() => {
      setinputSearch(e.target.value);
    }, 200);
  };

  const gridChangeHandler = () => {
    setgridChange(true);
  };

  const gridChangeHandler2 = () => {
    setgridChange(false);
  };
  const addToCartHandle = async (id) => {
    setAddToCartClick(true);
    setcartId(id);
    try {
      const response = await axios.post(
        "https://musicart-full-stack-project-backend.onrender.com/getCartProduct",
        {
          email: userEmail.replace(/"|'/g, ""),
          CartproductId: id,
        },
        {
          headers: { Authorization: token.replace(/"/g, "") },
        }
      );
      setAddToCartClick(false);

      alert(response.data);
      getCartItem();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"));
  }, []);

  return (
    <div>
      {loading === true ? (
        <div>
          <OfferNavbar />
          <Navbar />

          <div className="homeContainer">
            <div className="homeInnerContainer">
              <div className="offerBannerDiv">
                <div className="offerInnerBannerDiv">
                  <p className="offer">
                    Grab upto 50% off on Selected headphones
                  </p>
                  <button className="buyNowBtn">Buy Now</button>
                </div>
                <img className="girlImg" src={GirlImage} alt="" />
              </div>
            </div>
            <div className="searchDiv">
              <div className="search">
                <img alt="" src={searchImage} />
                <input
                  onChange={inputSearchHandler}
                  placeholder="Search You Headphone Here"
                  type="text"
                />
              </div>
            </div>

            <div className="gridDiv">
              <div className="gridInnerDiv">
                <div>
                  <img
                    src={gridChange === false ? gripViewImage4 : gripViewImage}
                    alt=""
                    onClick={gridChangeHandler}
                  />
                  <img
                    src={gridChange === false ? gripViewImage3 : gripViewImage2}
                    alt=""
                    onClick={gridChangeHandler2}
                  />
                </div>
                <div className="dropdownMainContainer">
                  <div className="dropdownContainer">
                    <div class="dropdown">
                      <button className="headphoneBtn">
                        {headPhoneType.length === 0
                          ? "Headphone type"
                          : headPhoneType}
                      </button>
                      <div class="dropdown-content">
                        <p onClick={() => setHeadPhoneType("In-Ear-HeadPhon")}>
                          In-ear-HeadPhone
                        </p>
                        <p onClick={() => setHeadPhoneType("On-Ear-Headphone")}>
                          On-Ear-Headphone
                        </p>
                        <p
                          onClick={() => setHeadPhoneType("Over-Ear-Headphone")}
                        >
                          Over-Ear-Headphone
                        </p>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="dropdownContainer">
                    <div class="dropdown">
                      <button>
                        {companyType.length === 0 ? "Company" : companyType}
                      </button>
                      <div class="dropdown-content">
                        <p onClick={() => seCompanyType("JBL")}>JBL</p>
                        <p onClick={() => seCompanyType("Sony")}>Sony</p>
                        <p onClick={() => seCompanyType("boat")}>Boat</p>
                        <p onClick={() => seCompanyType("Zebronics")}>
                          Zebronics
                        </p>
                        <p onClick={() => seCompanyType("Marshall")}>
                          Marshall
                        </p>
                        <p onClick={() => seCompanyType("Ptron")}>Ptron</p>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="dropdownContainer">
                    <div class="dropdown">
                      <button>
                        {headPhoneColor.length === 0 ? "Color" : headPhoneColor}
                      </button>

                      <div class="dropdown-content">
                        <p id="Blue" onClick={() => setheadPhoneColor("Blue")}>
                          Blue
                        </p>
                        <p
                          id="Black"
                          onClick={() => setheadPhoneColor("Black")}
                        >
                          Black
                        </p>
                        <p
                          id="White"
                          onClick={() => setheadPhoneColor("White")}
                        >
                          White
                        </p>
                        <p
                          id="Brown"
                          onClick={() => setheadPhoneColor("Brown")}
                        >
                          Brown
                        </p>
                      </div>
                    </div>
                    <div></div>
                  </div>

                  <div className="dropdownContainer">
                    <div class="dropdown">
                      <button>
                        {headPhonePrice.length === 0 ? "Price" : headPhonePrice}
                      </button>

                      <div class="dropdown-content">
                        <p id="1" onClick={() => setHeadPhonePrice("0-1,000")}>
                          ₹0-₹1,000
                        </p>
                        <p
                          id="2"
                          onClick={() => setHeadPhonePrice("1,000-10,000")}
                        >
                          ₹1,000-₹10,000
                        </p>
                        <p
                          id="3"
                          onClick={() => setHeadPhonePrice("10,000-20,000")}
                        >
                          ₹10,000-₹20,000
                        </p>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="resetDiv">
                <div>
                  <button onClick={resetFilterHandler}>Reset Filter</button>
                </div>
              </div>
            </div>

            <div>
              <div class="row">
                {apidata
                  ? apidata.map((data, index) => (
                      <div
                        class={gridChange === true ? "column" : "column2"}
                        key={index}
                      >
                        <div class="card">
                          <div class={gridChange === true ? "grid" : "grid2"}>
                            <div
                              class={
                                gridChange === true
                                  ? "gridChange"
                                  : "gridChange2"
                              }
                            >
                              <img
                                className={
                                  isLogin === true
                                    ? "productImage"
                                    : "productImage2"
                                }
                                alt=""
                                onClick={() => {
                                  navigate("/productdetails/" + data._id);
                                }}
                                src={data.productImage[0]}
                              />
                              {gridChange === true && isLogin === true ? (
                                addToCartClick === false ? (
                                  <img
                                    alt=""
                                    src={CartImage2}
                                    onClick={() => addToCartHandle(data._id)}
                                  />
                                ) : cartId === data._id ? (
                                  <i class="sdasd fa fa-spinner fa-spin"></i>
                                ) : (
                                  <img
                                    alt=""
                                    src={CartImage2}
                                    onClick={() => addToCartHandle(data._id)}
                                  />
                                )
                              ) : (
                                ""
                              )}
                            </div>
                            <div
                              className={
                                gridChange === true
                                  ? "productDetailss"
                                  : "productDetailss2"
                              }
                            >
                              <div
                                className={
                                  gridChange === true
                                    ? "commonCLass2"
                                    : "commonCLass"
                                }
                              >
                                <p
                                  class={
                                    gridChange === true
                                      ? "cartDetilss"
                                      : "cartDetilsP"
                                  }
                                >
                                  {data.productName}
                                </p>
                              </div>
                              <div
                                className={
                                  gridChange === true
                                    ? "commonCLass2"
                                    : "commonCLass"
                                }
                              >
                                <p
                                  class={
                                    gridChange === true
                                      ? "cartDetilss"
                                      : "cartDetils"
                                  }
                                >
                                  Price - ₹ {data.productPrice}
                                </p>
                              </div>

                              <div
                                className={
                                  gridChange === true
                                    ? "commonCLass2"
                                    : "commonCLass"
                                }
                              >
                                <p
                                  class={
                                    gridChange === true
                                      ? "cartDetilss"
                                      : "cartDetils"
                                  }
                                >
                                  {data.productColor} | {data.productType}
                                </p>
                              </div>
                              <div
                                className={
                                  gridChange === true
                                    ? "commonCLass2"
                                    : "commonCLass"
                                }
                              >
                                {gridChange === false ? (
                                  <p
                                    class={
                                      gridChange === true
                                        ? "cartDetilss"
                                        : "cartDetils"
                                    }
                                  >
                                    {data.productAbout}
                                  </p>
                                ) : (
                                  ""
                                )}
                                <div
                                  className={
                                    gridChange === true
                                      ? "commonCLass2"
                                      : "commonCLass"
                                  }
                                >
                                  {gridChange === false ? (
                                    <button
                                      className="addToCartIcon"
                                      onClick={() => {
                                        navigate("/productdetails/" + data._id);
                                      }}
                                    >
                                      Details
                                    </button>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default React.memo(Home);
