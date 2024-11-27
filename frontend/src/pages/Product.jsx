import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Star, AddShoppingCart, ArrowBack, Check } from "@mui/icons-material";
import "../styles/common.css";
import "../styles/product.css";
import { listProductDetail } from "../actions/productActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { addToCart } from "../actions/cartActions";
// import Message from "../components/Message";

function Product({ params }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const location = useLocation();
    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;
    const cartItemsList = useSelector((state) => state.cart.cartItemsList);

    const [activeTab, setActiveTab] = useState("description");
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    useEffect(() => {
        dispatch(listProductDetail(id));
    }, [dispatch, id]);

    useEffect(() => {
        const existingItem = cartItemsList.find((item) => item.productId === product.id);
        setIsAddedToCart(!!existingItem);
    }, [cartItemsList, product.id]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleAddToCart = (product) => {
        if (!isAddedToCart) {
            dispatch(addToCart(product));
            setIsAddedToCart(true);
        }
    };

    const {
        image,
        productName,
        productInfo,
        numReviews,
        price,
        rating,
        stockCount,
        productBrand,
        productCategories,
        productDescription,
        productSpecification,
        productReviews,
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
                            <div>
                                <h4 className="product-brand">{productBrand}</h4>
                                {!stockCount ? (
                                    <p className="stock-tag out-of-stock">Out of Stock</p>
                                ) : stockCount < 50 ? (
                                    <p className="stock-tag few-stock">Only Few Left</p>
                                ) : (
                                    ""
                                )}
                            </div>
                            <h2 className="product-name">{productName}</h2>
                            <ul className="product-category-list">
                                {(productCategories || []).map((category) => {
                                    return (
                                        <li className="category-item" key={category}>
                                            {category}
                                        </li>
                                    );
                                })}
                            </ul>
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
                                <div className="description">{productDescription}</div>
                            )}
                            {activeTab === "specification" && (
                                <div className="specification">{productSpecification}</div>
                            )}

                            {activeTab === "reviews" && (
                                <div className="reviews">{productReviews}</div>
                            )}
                        </div>
                        <div className="product-action">
                            <div className="rating">
                                <h3>{rating}</h3>
                                <Star style={{ textAlign: "center", verticalAlign: "center" }} />
                                {` (${numReviews})`}
                                {/* {`from ${numReviews} reviews`} */}
                            </div>
                            <button
                                className={`add-to-cart-btn ${!stockCount ? "sold-out" : ""}`}
                                onClick={() => handleAddToCart(product)}
                                disabled={!stockCount || isAddedToCart}
                            >
                                {isAddedToCart ? "Added" : "Add to Cart"}
                                {isAddedToCart ? <Check /> : <AddShoppingCart />}
                            </button>
                            {/* {isAddedToCart ? (
                                <Message
                                    messageType={"fail"}
                                    message={"Item already added to cart."}
                                />
                            ) : (
                                ""
                            )} */}
                            {/* {isAddedToCart && (
                                <Message messageType={"success"} message={"Item added to cart!"} />
                            )} */}
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
