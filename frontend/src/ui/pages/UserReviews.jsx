import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReviewForm from "../components/ReviewForm";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteReview,
    fetchUserReviews,
} from "../../redux/actions/reviewActions";
import { Delete, Edit } from "@mui/icons-material";
import Ratings from "../components/Ratings";
import ShimmerReviews from "../layouts/ShimmerReviews";

function UserReviews() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userReviews = useSelector((state) => state.userReviews);
    const { reviews = [], error, loading } = userReviews;

    useEffect(() => {
        if (userInfo.id) dispatch(fetchUserReviews(userInfo.id));
        // if (error) toast.error("No Reviews found.");
    }, [dispatch, userInfo.id, error]);

    const [reviewFormState, setReviewFormState] = useState({
        isVisible: false,
        product: null,
        review: null,
    });
    const handleReviewForm = (product = null, review = null) => {
        console.log("Product & review being passed:", review);
        setReviewFormState((prev) => ({
            isVisible: !prev.isVisible,
            product,
            review,
        }));
    };

    const handleDelete = (reviewId) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            dispatch(deleteReview(reviewId));
        }
        dispatch(fetchUserReviews(userInfo.id));
    };
    const [selectedFilter, setSelectedFilter] = useState("none");
    const [activeFilter, setActiveFilter] = useState("none");

    const [sortBy, setSortBy] = useState("");
    const [activeSort, setActiveSort] = useState("");

    const sortButtons = [
        { sortName: "Date -- Newset First", methodName: "newDateFirst" },
        { sortName: "Date -- Oldest First", methodName: "oldDateFirst" },
    ];

    const reviewFilters = [1, 2, 3, 4, 5]; // Filter for ratings 1 to 5

    // Filter reviews based on rating
    let filteredReviews = reviews.filter((review) => {
        if (selectedFilter === "none") {
            return true; // No filter, show all reviews
        }
        // Extract the rating from the selected filter
        const ratingValue = parseInt(selectedFilter);
        if (ratingValue) {
            return (
                review.rating >= ratingValue && review.rating < ratingValue + 1
            );
        }
        return true;
    });

    let sortedReviews = [...filteredReviews];

    if (sortBy === "newDateFirst") {
        sortedReviews.sort((a, b) => {
            const dateA = new Date(
                a.created_at_formatted
                    .replace(" | ", " ")
                    .replace(/(\d{1,2})([APM]{2})$/, "$1 $2")
            );
            const dateB = new Date(
                b.created_at_formatted
                    .replace(" | ", " ")
                    .replace(/(\d{1,2})([APM]{2})$/, "$1 $2")
            );
            return dateB - dateA;
        });
    } else if (sortBy === "oldDateFirst") {
        sortedReviews.sort((a, b) => {
            const dateA = new Date(
                a.created_at_formatted
                    .replace(" | ", " ")
                    .replace(/(\d{1,2})([APM]{2})$/, "$1 $2")
            );
            const dateB = new Date(
                b.created_at_formatted
                    .replace(" | ", " ")
                    .replace(/(\d{1,2})([APM]{2})$/, "$1 $2")
            );
            return dateA - dateB;
        });
    }

    const handleOrderFilter = (filter) => {
        if (selectedFilter === filter) {
            setSelectedFilter("none");
            setActiveFilter("none");
        } else {
            setSelectedFilter(filter);
            setActiveFilter(filter);
        }
    };

    return (
        <>
            <Navbar />
            <div className="reviews-container p-8 min-h-[35rem] flex items-start justify-between gap-8">
                <div className="reviews w-full">
                    <h1 className="sub-heading text-7xl font-bold p-8 flex items-center justify-center gap-8">
                        My Reviews
                    </h1>
                    <div className="reviews-container p-16">
                        {loading ? (
                            <ShimmerReviews />
                        ) : reviews.lenght === 0 ? (
                            <p className="text-4xl font-medium p-32 text-center">
                                No reviews yet.
                                <br />
                                Review your first product now ;)
                            </p>
                        ) : (
                            <>
                                <div className="flex items-center justify-between gap-[100rem] w-full">
                                    {/* Sort Buttons */}
                                    <ul className="flex lg_tab:hidden justify-center items-center gap-8 w-full">
                                        {sortButtons.map((sortBtn, index) => (
                                            <li key={index}>
                                                <button
                                                    className={`relative bg-transparent border-none p-2 cursor-pointer text-[1.8rem]
                ${
                    activeSort === sortBtn.methodName
                        ? "text-[#014210] font-semibold"
                        : ""
                } group`}
                                                    onClick={() => {
                                                        setActiveSort(
                                                            sortBtn.methodName
                                                        );
                                                        setSortBy(
                                                            sortBtn.methodName
                                                        );
                                                    }}
                                                >
                                                    {sortBtn.sortName}
                                                    <span
                                                        className={`absolute left-0 right-0 bottom-[-0.2rem] h-[2px] bg-[#014210]
                        ${
                            activeSort === sortBtn.methodName
                                ? "scale-x-100"
                                : "scale-x-0"
                        } group-hover:scale-x-100
                    transition-transform duration-300`}
                                                    ></span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    {/* Filter Buttons */}
                                    <ul className="flex lg_tab:hidden justify-center items-center gap-8 w-full">
                                        {reviewFilters.map((filter, index) => (
                                            <li key={index}>
                                                <button
                                                    className={`relative bg-transparent border-none p-2 cursor-pointer text-[1.8rem]
                    ${
                        activeFilter === `${filter} Star`
                            ? "text-[#014210] font-semibold"
                            : ""
                    } group`}
                                                    onClick={() =>
                                                        handleOrderFilter(
                                                            `${filter} Star`
                                                        )
                                                    }
                                                >
                                                    {`${filter} Star`}
                                                    <span
                                                        className={`absolute left-0 right-0 bottom-[-0.2rem] h-[2px] bg-[#014210]
                        ${
                            activeFilter === `${filter} Star`
                                ? "scale-x-100"
                                : "scale-x-0"
                        } group-hover:scale-x-100
                    transition-transform duration-300`}
                                                    ></span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <ul className="grid grid-cols-2 items-center justify-center gap-12 p-8 w-full">
                                    {sortedReviews.map((review) => (
                                        <li
                                            key={review.id}
                                            className="flex items-center justify-start border-2 border-[#014210] rounded-lg w-full bg-[#e4efe4]"
                                        >
                                            {review.product.productImages?.sort(
                                                (img1, img2) =>
                                                    img1.image.localeCompare(
                                                        img2.image
                                                    )
                                            )[0] && (
                                                <img
                                                    src={
                                                        review.product
                                                            .productImages[0]
                                                            .image
                                                    }
                                                    alt={
                                                        review.product
                                                            .productName
                                                    }
                                                    className="w-[40rem] border-r-2 border-r-[#560000]"
                                                />
                                            )}
                                            <div className="flex flex-col items-start justify-start px-8 w-full gap-5 h-auto">
                                                <div className="review-btns flex self-end items-center justify-center gap-8">
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault(); // Prevent the link navigation
                                                            handleReviewForm(
                                                                review.product,
                                                                review
                                                            ); // Toggle the form
                                                        }}
                                                    >
                                                        <Edit
                                                            style={{
                                                                fontSize:
                                                                    "3.2rem",
                                                                color: "#560000",
                                                            }}
                                                        />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleDelete(
                                                                review.id
                                                            );
                                                        }}
                                                    >
                                                        <Delete
                                                            style={{
                                                                fontSize:
                                                                    "3.2rem",
                                                                color: "#560000",
                                                            }}
                                                        />
                                                    </button>
                                                </div>
                                                <p className="text-2xl text-[#560000] font-medium">
                                                    Reviewed On:{" "}
                                                    {
                                                        review.created_at_formatted
                                                    }
                                                </p>
                                                {review.created_at_formatted !==
                                                    review.updated_at_formatted && (
                                                    <p className="text-2xl text-[#560000] font-medium">
                                                        Updated On:{" "}
                                                        {
                                                            review.updated_at_formatted
                                                        }
                                                    </p>
                                                )}
                                                <h2 className="font-merriweather text-xl font-semibold w-full text-[#560000]">
                                                    {
                                                        review.product
                                                            .productBrand
                                                    }
                                                </h2>
                                                <h2 className="font-merriweather text-2xl font-semibold w-full">
                                                    {review.product.productName}
                                                </h2>

                                                {reviewFormState.isVisible &&
                                                    reviewFormState.review
                                                        ?.id === review.id && (
                                                        <ReviewForm
                                                            title="Update Review"
                                                            toggleReviewForm={() =>
                                                                handleReviewForm(
                                                                    review.product,
                                                                    review
                                                                )
                                                            }
                                                            method="editReview"
                                                            product={
                                                                reviewFormState.product
                                                            }
                                                            review={
                                                                reviewFormState.review
                                                            }
                                                            userInfo={userInfo}
                                                        />
                                                    )}

                                                <Ratings
                                                    rating={review.rating}
                                                />
                                                <h2 className="font-playfair text-4xl font-semibold w-full">
                                                    {review.review_title}
                                                </h2>
                                                <p className="font-mono text-2xl w-full max-h-[10rem] overflow-auto scrollbar-none text-[#560000] font-semibold">
                                                    "{review.review_comment}"
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserReviews;
