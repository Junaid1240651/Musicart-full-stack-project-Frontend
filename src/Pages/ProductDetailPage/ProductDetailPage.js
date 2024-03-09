import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetailPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import searchImage from "../../images/searchImage.png";
import BackToProductPageBtn from "../../Components/BackToProductPageBtn/BackToProductPageBtn";
import ratingStarImage from "../../images/ratingStarImage.png";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import OfferNavbar from "../../Components/OfferNavbar/OfferNavbar";
import { FetchCartProduct } from "../../FetchCartProduct/FetchCartProduct";
import Footer from "../../Components/Footer/Footer";
import { useCombinedContext } from "../../contextApi/CombinedContextProvider ";

const ProductDetailPage = () => {
  const [apidata, setApiData] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [btnChange, setBtnChange] = useState(false);
  const [imageChange, setimageChange] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [userEmail, setUserEmail] = useState();
  const token = localStorage.getItem("LoginJwtToken");
  const { isLogin } = useCombinedContext();
  const { getCartItem } = FetchCartProduct();

  const homeNavigate = () => {
    navigate("/");
  };
  console.log("rstgfgtsdf");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  const fetchImages = async () => {
    const promises = apidata.map(async (slide) => {
      const imageUrls = await Promise.all(
        slide.productImage.map(async (imageUrl) => {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        })
      );
      return {
        imageUrls,
      };
    });

    const slides = await Promise.all(promises);

    const namesArray = slides.map((obj) => obj.imageUrls);

    setImageUrls(namesArray[0]);
  };
  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === imageUrls.length - 1 ? 0 : currentSlide + 1
    );
  };
  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? imageUrls.length - 1 : currentSlide - 1
    );
  };

  const addToCartHandler = async (e) => {
    setBtnChange(true);
    setLoading2(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/getCartProduct",
        {
          email: userEmail.replace(/"|'/g, ""),
          CartproductId: id,
        },
        {
          headers: {
            Authorization: token.replace(/"/g, ""),
          },
        }
      );
      alert(response.data);
      setLoading2(false);
      getCartItem();
    } catch (error) {
      alert(error.message);
    }
  };

  const removeToCartHandler = async (e) => {
    setBtnChange(false);
    setLoading2(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/removeCartProduct",
        {
          email: userEmail.replace(/"|'/g, ""),
          productId: id,
        },
        {
          headers: {
            Authorization: token.replace(/"/g, ""),
          },
        }
      );
      alert(response.data);
      getCartItem();
      setLoading2(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const buyNowHandler = async () => {
    console.log(token);
    setLoading3(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/checkOutProduct",
        {
          checkOutProductEmail: userEmail.replace(/"|'/g, ""),
          checkOutProductId: id,
        },
        {
          headers: {
            Authorization: token.replace(/"/g, ""),
          },
        }
      );
      setLoading3(false);
      console.log(response.data);
      navigate("/checkout");
    } catch (error) {
      alert(error.message);
    }
  };
  const getProductDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/productdetails/" + id
      );
      setApiData([response.data]);
      setLoading(true);
      setUserEmail(localStorage.getItem("userEmail"));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, [apidata]);

  useEffect(() => {
    getProductDetails();
  }, []);

  const imageChangeHandler = (e) => {
    setimageChange(e.target.id);
  };
  return (
    <div>
      <OfferNavbar />
      <Navbar />
      {loading === true ? (
        <div className="productDetailContainer">
          <div className="productDetailInnerContainer">
            <BackToProductPageBtn home={homeNavigate} />
          </div>
          <div>
            {apidata
              ? apidata.map((data) => (
                  <div>
                    <div>
                      <p className="pName">{data.productDetailName}</p>
                    </div>
                    <div className="pDiv">
                      <div>
                        <img
                          alt=""
                          src={data.productImage[imageChange ? imageChange : 0]}
                        />
                      </div>
                      <div>
                        <p className="pName2">{data.productName}</p>
                        <div className="pImageDiv">
                          <img src={ratingStarImage} />
                          <img src={ratingStarImage} />
                          <img src={ratingStarImage} />
                          <img src={ratingStarImage} />
                          <img src={ratingStarImage} />
                          <p>(50 Customer reviews)</p>
                        </div>
                        <div>
                          <p className="pPrice">Price - ₹{data.productPrice}</p>
                        </div>
                        <div className="pDetail">
                          <p>{data.productColor}</p>
                          <p>|</p>
                          <p>{data.productType}</p>
                        </div>
                        <div>
                          <p className="pAbout">{data.productAbout}</p>
                        </div>
                        <div className="pStock">
                          <p>
                            Available -{" "}
                            {data.productStock === true
                              ? "In stock"
                              : "Out Of stock"}
                          </p>
                          <p>Brand - {data.productBrand}</p>
                        </div>
                      </div>
                    </div>
                    <div className="pOtherImagesDiv">
                      <div>
                        <img
                          id="1"
                          alt=""
                          onClick={imageChangeHandler}
                          src={data.productImage[1]}
                        />
                        <img
                          id="2"
                          alt=""
                          onClick={imageChangeHandler}
                          src={data.productImage[2]}
                        />
                        <img
                          id="3"
                          alt=""
                          onClick={imageChangeHandler}
                          src={data.productImage[3]}
                        />
                      </div>
                      <div className="pMobileViewContainer">
                        <div>
                          {isLogin === true ? (
                            <div>
                              {btnChange === false ? (
                                <button
                                  className="addCartBtn"
                                  id={data._id}
                                  onClick={addToCartHandler}
                                >
                                  {loading2 === true ? (
                                    <div>
                                      <i class="fa fa-spinner fa-spin"></i>
                                      Loading
                                    </div>
                                  ) : (
                                    "Add To Cart"
                                  )}
                                </button>
                              ) : (
                                <button
                                  id={data._id}
                                  className="addCartBtn"
                                  onClick={removeToCartHandler}
                                >
                                  {loading2 === true ? (
                                    <div>
                                      <i class="fa fa-spinner fa-spin"></i>
                                      Loading
                                    </div>
                                  ) : (
                                    "Remove To Cart"
                                  )}
                                </button>
                              )}

                              {loading3 === false ? (
                                <button
                                  className="addCartBtn"
                                  onClick={buyNowHandler}
                                >
                                  Buy Now
                                </button>
                              ) : (
                                <button className="addCartBtn">
                                  <i class="fa fa-spinner fa-spin"></i>
                                  Loading
                                </button>
                              )}
                            </div>
                          ) : (
                            <button
                              className="addCartBtn"
                              onClick={() => navigate("/login")}
                            >
                              Login
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
      <div className="movileViewPContainer">
        {apidata
          ? apidata.map((data) => (
              <div>
                <div>
                  <div className="searchDiv">
                    <div className="search">
                      <img src={searchImage} />
                      <input
                        placeholder="Search You Headphone Here"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="mobileViewAddToCartBTn"
                  onClick={() => navigate(-1)}
                >
                  🡠
                </button>
                <div>
                  {isLogin === true ? (
                    <div className="mobileViewAddToCartBTnDiv">
                      {loading3 === false ? (
                        <button className="buyNowBtn" onClick={buyNowHandler}>
                          Buy Now
                        </button>
                      ) : (
                        <button className="buyNowBtn">
                          <i class="fa fa-spinner fa-spin"></i>
                          Loading
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="mobileViewAddToCartBTnDiv btn">
                      <button
                        className="login-btn"
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </button>
                    </div>
                  )}
                </div>
                <div className="slider">
                  <img
                    src={imageUrls[currentSlide]}
                    alt="Slide"
                    className="slide-image"
                  />
                  <div>
                    <button className="prev" onClick={prevSlide}>
                      🡠
                    </button>

                    <button className="next" onClick={nextSlide}>
                      🡢
                    </button>
                  </div>
                </div>
                <div>
                  <div className="mobileViewPName">
                    <p>{data.productName}</p>
                    <div>
                      <div className="reviewDivision">
                        <img src={ratingStarImage} />
                        <img src={ratingStarImage} />
                        <img src={ratingStarImage} />
                        <img src={ratingStarImage} />
                        <img src={ratingStarImage} />
                        <p>(50 Customer reviews)</p>
                      </div>
                      <div className="mobileViewPDetailsDiv">
                        <p className="mobileViewPAbout">{data.productAbout}</p>
                        <p>
                          Available -{" "}
                          {data.productStock === true
                            ? "In stock"
                            : "Out Of stock"}
                        </p>
                        <p>Brand - {data.productBrand}</p>
                      </div>
                    </div>

                    <div className="mobileViewAddToCartBTnDiv">
                      {isLogin === true ? (
                        <div className="mobileViewAddToCartBTnDiv">
                          {btnChange === false ? (
                            <button id={data._id} onClick={addToCartHandler}>
                              {loading2 === true ? (
                                <div>
                                  <i class="fa fa-spinner fa-spin"></i>
                                  Loading
                                </div>
                              ) : (
                                "Add To Cart"
                              )}
                            </button>
                          ) : (
                            <button id={data._id} onClick={removeToCartHandler}>
                              {loading2 === true ? (
                                <div>
                                  <i class="fa fa-spinner fa-spin"></i>
                                  Loading
                                </div>
                              ) : (
                                "Remove To Cart"
                              )}
                            </button>
                          )}

                          {loading3 === false ? (
                            <button onClick={buyNowHandler}>Buy Now</button>
                          ) : (
                            <button>
                              <i class="fa fa-spinner fa-spin"></i>
                              Loading
                            </button>
                          )}
                        </div>
                      ) : (
                        <button onClick={() => navigate("/login")}>
                          Login
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default ProductDetailPage;
