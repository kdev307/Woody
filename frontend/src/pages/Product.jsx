import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Tags from "../components/Tags";
import { Star, AddShoppingCart, Check, West } from "@mui/icons-material";
import { listProductDetail } from "../actions/productActions";
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
        const existingItem = cartItemsList.find(
            (item) => item.productId === product.id
        );
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
        // productInfo,
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
    const infoBtns = [
        {
            btnTabName: "Description",
            btnTabMethod: "description",
        },
        {
            btnTabName: "Specifications",
            btnTabMethod: "specifications",
        },
        {
            btnTabName: "Reviews",
            btnTabMethod: "reviews",
        },
    ];
    return (
        <>
            <Navbar />
            <Link
                to={`/store`}
                className="arrow-btn absolute left-8 my-8 px-4 py-2  text-[#560000] text-2xl font-bold"
            >
                <West style={{ fontSize: "2.4rem" }} />
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Error message={error} />
            ) : (
                <div className="product p-8 grid grid-cols-[2fr_3fr] gap-20 items-center justify-center text-xl bg-[#e4efe4] pt-28">
                    <div className="image-container max-w-2xl border-2 border-black bg-white">
                        <img src={image} alt={productName} className="w-full" />
                    </div>
                    <div className="product-info-container flex flex-col items-start justify-center gap-6">
                        <div className="product-main-info flex flex-col  items-start justify-center text-left">
                            <div className="flex items-center justify-center gap-96">
                                <h4 className="product-brand text-xl font-extrabold text-[#560000]">
                                    {productBrand}
                                </h4>
                                <div className="absolute top-72 left-[50rem] w-40">
                                    {!stockCount ? (
                                        <Tags
                                            tagData="Out of Stock"
                                            tagColor="#fff"
                                            tagBackgroundColor="#fb2d2d"
                                        />
                                    ) : stockCount < 50 ? (
                                        <Tags
                                            tagData="Only few left"
                                            tagColor="#fff"
                                            tagBackgroundColor="#ff8811"
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <h2 className="product-name text-3xl font-bold">
                                {productName}
                            </h2>
                            <ul className="product-category-list flex flex-wrap items-center justify-start gap-2 mt-2 p-2">
                                {(productCategories || []).map((category) => {
                                    return (
                                        <li
                                            className="category-item rounded-lg text-lg font-semibold bg-[#560000] text-white p-2 text-center"
                                            key={category}
                                        >
                                            {category}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <ul className="info-btns flex items-center justify-center text-center p-0 m-auto -mt-4 border-2 rounded-[4rem] bg-[#ddd] transition-all ease-in-out duration-1000">
                            {infoBtns.map((btn, index) => (
                                <li key={index}>
                                    <button
                                        className={`info-btn ${
                                            activeTab === btn.btnTabMethod
                                                ? "bg-white transition-all ease-in-out duration-1000"
                                                : ""
                                        } font-medium text-xl`}
                                        onClick={() =>
                                            handleTabClick(btn.btnTabMethod)
                                        }
                                    >
                                        {btn.btnTabName}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="content py-0 px-8 text-left max-h-72 overflow-y-auto scrollbar">
                            {activeTab === "description" && (
                                <div className="description">
                                    {productDescription}
                                </div>
                            )}
                            {activeTab === "specification" && (
                                <div className="specification">
                                    {productSpecification}
                                </div>
                            )}

                            {activeTab === "reviews" && (
                                <div className="reviews">{productReviews}</div>
                            )}
                        </div>
                        <div className="product-action m-auto flex items-center justify-center gap-48 font-bold text-[#014210]">
                            <div className="rating flex items-center justify-center">
                                <h3>{rating}</h3>
                                <Star
                                    style={{
                                        textAlign: "center",
                                        verticalAlign: "center",
                                    }}
                                />
                                {` (${numReviews})`}
                                {/* {`from ${numReviews} reviews`} */}
                            </div>
                            <button
                                className={`add-to-cart-btn flex items-center justify-center gap-4 border-4 rounded-lg shadow-[5px_5px_10px_rgba(86,0,0,0.3)] transition-all ease duration-300 font-semibold text-lg
        ${
            !stockCount
                ? "cursor-not-allowed text-[#888] border-[#888] hover:text-[#888] hover:border-[#888]"
                : "border-[#560000] text-[#560000] bg-white hover:border-[#014210] hover:text-[#014210] hover:shadow-[5px_5px_10px_rgba(1,66,16,0.3)]"
        }`}
                                onClick={() => handleAddToCart(product)}
                                disabled={!stockCount || isAddedToCart}
                            >
                                {isAddedToCart ? "Added" : "Add to Cart"}
                                {isAddedToCart ? (
                                    <Check />
                                ) : (
                                    <AddShoppingCart />
                                )}
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
