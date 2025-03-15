import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Tags from "../components/Tags";
import ReviewForm from "../components/ReviewForm";
import Ratings from "../components/Ratings";
import {
    Star,
    AddShoppingCart,
    Check,
    West,
    Straighten,
    DescriptionOutlined,
    ReviewsOutlined,
    PermMedia,
    Close,
    ChevronLeft,
    ChevronRight,
    RateReview,
    CheckCircle,
} from "@mui/icons-material";
import { listProductDetail } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";
// import Message from "../components/Message";

function Product({ params }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    // const navigate = useNavigate();
    // const location = useLocation();
    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;
    const cartItemsList = useSelector((state) => state.cart.cartItemsList);

    const [activeTab, setActiveTab] = useState("description");
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const [mediaView, setMediaView] = useState(false);
    const [reviewFormState, setReviewFormState] = useState({
        isVisible: false,
        product: null,
        review: null,
    });

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

    const handleMediaView = () => {
        setMediaView((mediaView) => !mediaView);
    };

    const handleReviewForm = (product = null, review = null) => {
        setReviewFormState((prev) => ({
            isVisible: !prev.isVisible,
            product,
            review,
        }));
    };

    const {
        productImages,
        productName,
        // productInfo,
        productNumReviews,
        productPrice,
        productRating,
        productStockCount,
        productBrand,
        productCategories,
        productDescription,
        productSpecifications,
        productReviews,
    } = product;

    const infoBtns = [
        {
            btnTabName: "Description",
            btnTabMethod: "description",
            btnIcon: <DescriptionOutlined style={{ fontSize: "2.8rem" }} />,
        },
        {
            btnTabName: "Specifications",
            btnTabMethod: "specifications",
            btnIcon: <Straighten style={{ fontSize: "2.8rem" }} />,
        },
        {
            btnTabName: "Reviews",
            btnTabMethod: "reviews",
            btnIcon: <ReviewsOutlined style={{ fontSize: "2.8rem" }} />,
        },
    ];
    const formatText = (text) => {
        if (!text) return null;

        return text.split("\n").map((line, index) => {
            const trimmedLine = line.trim();

            // Check the level of nesting based on the number of leading dashes
            const nestingLevel =
                (trimmedLine.match(/^(-+)/) || [])[0]?.length || 0;

            // Define symbols for different nesting levels
            const symbols = ["◆", "✸", "▸"];
            const symbol =
                nestingLevel > 0 && nestingLevel <= symbols.length
                    ? symbols[nestingLevel - 1]
                    : ""; // Default to no symbol if level exceeds

            // Clean the text by removing leading dashes
            const content = trimmedLine.replace(/^(-+)/, "").trim();

            // Check for colon to bold the left part
            const colonIndex = content.indexOf(":");
            const hasColon = colonIndex !== -1;

            return (
                <div
                    key={index}
                    className={`flex items-start mb-1 ${
                        nestingLevel > 0 ? `ml-${nestingLevel * 4}` : ""
                    }`} // Indent based on nesting level
                >
                    {/* Render the nesting symbol */}
                    {symbol && <span className="mr-2">{symbol}</span>}

                    {/* Render content with bold before colon */}
                    {hasColon ? (
                        <span>
                            <span className="font-bold">
                                {content.slice(0, colonIndex + 1)}
                            </span>{" "}
                            {content.slice(colonIndex + 1).trim()}
                        </span>
                    ) : (
                        <span>{content}</span>
                    )}
                </div>
            );
        });
    };

    return (
        <>
            <Navbar />
            <Link
                to={`/store`}
                className="arrow-btn absolute left-8 my-8 px-4 py-2  text-[#560000] text-2xl font-bold"
            >
                <West style={{ fontSize: "3.6rem" }} />
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Error message={error} />
            ) : (
                <div className="product p-8 grid grid-cols-[2fr_3fr] tab:flex tab:flex-col tab:items-start tab:justify-start gap-8 sm_desk:gap-20 items-start justify-center text-xl bg-[#e4efe4] pt-32 min-h-[35rem]">
                    <div className="image-container overflow-hidden gap-4 self-center w-[100%] sm_desk:w-[105%] lg_tab:w-[108%] tab:w-[80%] sm_tab:w-[95%]">
                        {productImages?.sort((img1, img2) =>
                            img1.image.localeCompare(img2.image)
                        )[0] && (
                            <>
                                <img
                                    key={productImages[0].id}
                                    src={productImages[0].image}
                                    alt={`Product ${productImages[0].product_id}`}
                                    className="w-full border-2 border-black"
                                />
                                {userInfo &&
                                    !userInfo.isAdmin &&
                                    new Date(
                                        userInfo.date_of_birth
                                    ).getDate() === new Date().getDate() &&
                                    new Date(
                                        userInfo.date_of_birth
                                    ).getMonth() === new Date().getMonth() && (
                                        <div class="relative ">
                                            <span class="absolute bottom-[67rem] right-[58rem] uppercase text-[#333] border-2 border-black text-[1.3rem] font-semibold bg-[#a3ff3b] py-[0.8rem] px-[8rem] transform -rotate-45">
                                                Birthday Discount
                                            </span>
                                        </div>
                                    )}
                            </>
                        )}
                        <button
                            className="cursor-pointer absolute top-[28%] left-[36%]"
                            onClick={handleMediaView}
                        >
                            <PermMedia
                                style={{
                                    color: "#000",
                                    fontSize: "3.2rem",
                                }}
                            />
                        </button>
                        {mediaView && (
                            <ProductCarousel
                                productImages={productImages}
                                toggleMediaView={handleMediaView}
                            />
                        )}
                    </div>
                    <div className="product-info-container flex flex-col items-start justify-center gap-6">
                        <div className="product-main-info flex flex-col items-start justify-center text-left">
                            <div className="absolute top-[20%] left-[40.5%] sm_desk:top-[25%] sm_desk:left-[41.5%] lg_tab:left-[42%] tab:top-[110%] tab:left-[1.5%] sm_tab:top-[97%] mob:top-[77%] mob:left-[2%] w-60">
                                {!productStockCount ? (
                                    <Tags
                                        tagData="Out of Stock"
                                        tagColor="#fff"
                                        tagBackgroundColor="#fb2d2d"
                                    />
                                ) : productStockCount < 50 ? (
                                    <Tags
                                        tagData="Only few left"
                                        tagColor="#fff"
                                        tagBackgroundColor="#ff8811"
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="flex items-center justify-center gap-[30rem]">
                                <h4 className="product-brand text-3xl font-extrabold text-[#560000]">
                                    {productBrand}
                                </h4>
                            </div>
                            <h2 className="product-name text-5xl font-bold">
                                {productName}
                            </h2>
                            <ul className="product-category-list flex flex-wrap items-center justify-start gap-2 mt-2 p-2">
                                {(productCategories || []).map((category) => {
                                    return (
                                        <li
                                            className="category-item rounded-lg text-2xl font-semibold bg-[#560000] text-white p-2 text-center"
                                            key={category}
                                        >
                                            {category}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <ul className="info-btns flex items-center justify-center text-center gap-8 p-0 m-auto border-2 rounded-[4rem] bg-[#ddd] transition-all ease-in-out duration-1000">
                            {infoBtns.map((btn, index) => (
                                <li key={index}>
                                    <button
                                        className={`info-btn p-6 flex gap-4 items-center justify-center ${
                                            activeTab === btn.btnTabMethod
                                                ? "bg-white font-bold transition-all ease-in-out duration-1000"
                                                : ""
                                        } text-3xl`}
                                        onClick={() =>
                                            handleTabClick(btn.btnTabMethod)
                                        }
                                    >
                                        <>{btn.btnTabName}</>
                                        <>{btn.btnIcon}</>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="content py-4 px-8 max-h-[40rem] min-h-[40rem] mx-auto w-[95%] text-left indent-4 overflow-y-auto scrollbar">
                            {activeTab === "description" && (
                                <div className="description text-3xl">
                                    {productDescription}
                                </div>
                            )}
                            {activeTab === "specifications" && (
                                <ul className="specification text-3xl list-disc list-inside space-y-6 space-x-10">
                                    {productSpecifications &&
                                        formatText(productSpecifications)}
                                </ul>
                            )}
                            <ul className="flex flex-col items-center justify-center gap-30">
                                {activeTab === "reviews" &&
                                    (productReviews &&
                                    productReviews.length > 0 ? (
                                        productReviews.map((review) => (
                                            <li
                                                key={review.id}
                                                className="p-8 w-full"
                                            >
                                                <div className="flex items-center justify-start gap-32">
                                                    <img
                                                        src={
                                                            review.user_profile
                                                        }
                                                        alt={review.user_name}
                                                        className="w-40 rounded-full"
                                                    />
                                                    <strong className="text-4xl text-[#014210] font-merriweather">
                                                        {review.user_name}
                                                    </strong>
                                                    <div className="flex items-center justify-center gap-30">
                                                        <Ratings
                                                            rating={
                                                                review.rating
                                                            }
                                                        />
                                                    </div>
                                                    {review.is_verified_purchase ? (
                                                        <CheckCircle
                                                            style={{
                                                                fontSize:
                                                                    "3rem",
                                                            }}
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                    <div className="text-2xl text-[#014210] font-medium">
                                                        {review.created_at_formatted ===
                                                        review.updated_at_formatted
                                                            ? review.created_at_formatted
                                                            : review.updated_at_formatted}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start justify-center gap-6 p-4 pl-40 pb-8">
                                                    <h3 className="text-4xl font-semibold text-[#560000] font-playfair">
                                                        {review.review_title}
                                                    </h3>
                                                    <p className="text-3xl font-medium text-[#560000] font-mono">
                                                        "{review.review_comment}
                                                        "
                                                    </p>
                                                </div>

                                                <hr
                                                    style={{
                                                        width: "95%",
                                                        margin: "auto",
                                                        border: "0.19rem solid #014210",
                                                        borderRadius: "100rem",
                                                        boxShadow:
                                                            "5px 5px 10px #014210",
                                                    }}
                                                />
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-4xl font-medium p-32 text-center">
                                            No reviews yet.
                                            <br />
                                            Be the first to review this product!
                                        </p>
                                    ))}
                            </ul>
                        </div>
                        <div className="product-action m-auto flex items-center justify-center gap-40 sm_desk:gap-30 lg_tab:gap-20 font-bold text-[#014210]">
                            <div className="rating flex items-center justify-center text-4xl">
                                <h3>{Number(productRating).toFixed(1)}</h3>
                                <Star
                                    style={{
                                        textAlign: "center",
                                        verticalAlign: "center",
                                        fontSize: "2.8rem",
                                    }}
                                />
                                {` (${productNumReviews})`}
                                {/* {`from ${numReviews} reviews`} */}
                            </div>
                            <button
                                className="add-review-btn flex items-center justify-center gap-8 border-4 rounded-lg shadow-[5px_5px_10px_rgba(86,0,0,0.3)] transition-all ease duration-300 font-semibold text-[2.4rem] lg_tab:text-[2rem] p-4 border-[#560000] text-[#560000] bg-white hover:border-[#014210] hover:text-[#014210] hover:shadow-[5px_5px_10px_rgba(1,66,16,0.3)]"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent the link navigation
                                    handleReviewForm(product); // Toggle the form
                                }}
                            >
                                Write A Review
                                <RateReview style={{ fontSize: "3rem" }} />
                            </button>

                            <button
                                className={`add-to-cart-btn flex items-center justify-center gap-8 border-4 rounded-lg shadow-[5px_5px_10px_rgba(86,0,0,0.3)] transition-all ease duration-300 font-semibold text-[2.4rem] lg_tab:text-[2rem] p-4
        ${
            !productStockCount
                ? "cursor-not-allowed text-[#888] border-[#888] hover:text-[#888] hover:border-[#888]"
                : "border-[#560000] text-[#560000] bg-white hover:border-[#014210] hover:text-[#014210] hover:shadow-[5px_5px_10px_rgba(1,66,16,0.3)]"
        }`}
                                onClick={() => handleAddToCart(product)}
                                disabled={!productStockCount || isAddedToCart}
                            >
                                {isAddedToCart ? "Added" : "Add to Cart"}
                                {isAddedToCart ? (
                                    <Check />
                                ) : (
                                    <AddShoppingCart
                                        style={{ fontSize: "3rem" }}
                                    />
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
                            <div className="flex items-center justify-center gap-12">
                                {userInfo &&
                                !userInfo.isAdmin &&
                                new Date(userInfo.date_of_birth).getDate() ===
                                    new Date().getDate() &&
                                new Date(userInfo.date_of_birth).getMonth() ===
                                    new Date().getMonth() ? (
                                    <>
                                        <h3 className="line-through product-price text-3xl">
                                            ₹{productPrice}
                                        </h3>
                                        <h3 className="product-price text-5xl">
                                            ₹{(productPrice * 90) / 100}
                                        </h3>
                                    </>
                                ) : (
                                    <h3 className="product-price text-4xl">
                                        ₹{productPrice}
                                    </h3>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {reviewFormState.isVisible && (
                <ReviewForm
                    title="Write A Review"
                    toggleReviewForm={handleReviewForm}
                    method="addReview"
                    product={product}
                    userInfo={userInfo}
                />
            )}
            <Footer />
        </>
    );
}

function ProductCarousel({ productImages, toggleMediaView }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to move to the next image
    const nextImage = () => {
        setCurrentIndex(
            currentIndex + 1 >= productImages.length ? 0 : currentIndex + 1
        );
    };

    // Function to move to the previous image
    const prevImage = () => {
        setCurrentIndex(
            currentIndex - 1 < 0 ? productImages.length - 1 : currentIndex - 1
        );
    };

    // Automatically transition the carousel every 5 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            nextImage(); // Automatically move to the next image
        }, 5000); // Change to next image every 5 seconds

        // Cleanup on component unmount
        return () => clearInterval(intervalId);
    }, [currentIndex]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm bg-opacity-75"
            onClick={toggleMediaView}
        >
            <div
                className="relative w-[40%] h-[90%] bg-[#e4efe4] rounded-lg p-8 border-2 border-[#014210] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="product-form-container p-6">
                    <div className="pt-12 flex items-center justify-end">
                        <Close
                            className="cart-close-btn cursor-pointer text-[#014210] text-4xl absolute top-8 right-20"
                            style={{ fontSize: "3.6rem" }}
                            onClick={toggleMediaView}
                        />
                    </div>

                    {/* Carousel container */}
                    <div className="relative overflow-hidden">
                        <div
                            className="image-container flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${
                                    currentIndex * 100
                                }%)`,
                            }}
                        >
                            {productImages &&
                                productImages
                                    .sort((img1, img2) => {
                                        // img1.image.localeCompare(img2.image);
                                        const num1 = parseInt(
                                            img1.image.match(/\d+/)[0],
                                            10
                                        ); // Extract the number from the image name
                                        const num2 = parseInt(
                                            img2.image.match(/\d+/)[0],
                                            10
                                        ); // Extract the number from the image name
                                        return num1 - num2; // Compare the numbers
                                    })
                                    .map((image) => (
                                        <div
                                            key={image.id}
                                            className="w-full h-full overflow-hidden flex-shrink-0 flex items-center justify-center"
                                        >
                                            <img
                                                src={image.image}
                                                alt={`Product ${image.product_id}`}
                                                className="w-full h-full object-cover border-2 border-black"
                                            />
                                        </div>
                                    ))}
                        </div>

                        {/* Buttons for manual control */}
                        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
                            <button
                                className="bg-black p-2 rounded-full"
                                onClick={prevImage}
                            >
                                <ChevronLeft
                                    style={{
                                        fontSize: "3.2rem",
                                        color: "white",
                                    }}
                                />
                            </button>
                        </div>
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
                            <button
                                className="bg-black p-2 rounded-full"
                                onClick={nextImage}
                            >
                                <ChevronRight
                                    style={{
                                        fontSize: "3.2rem",
                                        color: "white",
                                    }}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
