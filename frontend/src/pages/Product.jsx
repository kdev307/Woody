import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Star, AddShoppingCart, ArrowBack } from "@mui/icons-material";
import "../styles/common.css";
import "../styles/product.css";
import { listProductDetail } from "../actions/productActions";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Product({ params }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;
    useEffect(() => {
        dispatch(listProductDetail(id));
    }, [dispatch, id]);
    const [activeTab, setActiveTab] = useState("description");
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const {
        image,
        productName,
        productInfo,
        numReviews,
        price,
        rating,
        // stockCount,
        productBrand,
        // productCategory,
    } = product;
    return (
        <>
            <Navbar />
            <Link to={`/store`} className="arrow-btn">
                <ArrowBack style={{ fontSize: "2.4rem" }} />
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Error message={error} />
            ) : (
                <div className="product">
                    <div className="image-container">
                        <img src={image} alt={productName} />
                    </div>
                    <div className="product-info-container">
                        <div className="product-main-info">
                            <h4 className="product-brand">{productBrand}</h4>
                            <h2 className="product-name">{productName}</h2>
                        </div>
                        <ul className="info-btns">
                            <li>
                                <button
                                    className={`info-btn ${
                                        activeTab === "description" ? "active" : ""
                                    }`}
                                    onClick={() => handleTabClick("description")}
                                >
                                    Description
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`info-btn ${
                                        activeTab === "specification" ? "active" : ""
                                    }`}
                                    onClick={() => handleTabClick("specification")}
                                >
                                    Specification
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`info-btn ${
                                        activeTab === "reviews" ? "active" : ""
                                    }`}
                                    onClick={() => handleTabClick("reviews")}
                                >
                                    Reviews
                                </button>
                            </li>
                        </ul>
                        <div className="content">
                            {activeTab === "description" && (
                                <div className="description">{productInfo}</div>
                            )}
                            {activeTab === "specification" && (
                                <div className="specification">
                                    This is the product specification.
                                </div>
                            )}
                            {activeTab === "reviews" && (
                                <div className="reviews">This is the product reviews.</div>
                            )}
                        </div>
                        <div className="product-action">
                            <div className="rating">
                                <h3>{rating}</h3>
                                <Star style={{ textAlign: "center", verticalAlign: "center" }} />
                                {` (${numReviews})`}
                                {/* {`from ${numReviews} reviews`} */}
                            </div>
                            <button className="add-to-cart-btn">
                                Add to Cart
                                <AddShoppingCart />
                            </button>
                            <h3 className="product-price">₹ {price}</h3>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}

export default Product;
