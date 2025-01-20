import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReviewForm from "../components/ReviewForm";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { fetchUserReviews } from "../actions/reviewActions";
import { Delete, Edit } from "@mui/icons-material";
import Ratings from "../components/Ratings";

function UserReviews() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userReviews = useSelector((state) => state.userReviews);
    const { reviews = [], error, loading } = userReviews;

    useEffect(() => {
        if (userInfo.id) dispatch(fetchUserReviews(userInfo.id));
    }, [dispatch, userInfo.id]);

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
    return (
        <>
            <Navbar />
            <div className="reviews-container p-8 min-h-[35rem] flex items-start justify-between gap-8">
                <div className="reviews w-full">
                    <h1 className="sub-heading text-7xl font-bold p-8 flex items-center justify-center gap-8">
                        My Reviews
                    </h1>
                    <div className="reviews-container p-16">
                        {userInfo && loading ? (
                            <Loader />
                        ) : error ? (
                            <Error message={error} />
                        ) : (
                            <ul className="grid grid-cols-2 items-center justify-center gap-12 p-8">
                                {reviews.map((review) => (
                                    <li
                                        key={review.id}
                                        className="flex items-center justify-start border-2 border-[#014210] rounded-lg w-full bg-[#e4efe4]"
                                    >
                                        {review.product.productImages.sort(
                                            (img1, img2) =>
                                                img1.image.localeCompare(
                                                    img2.image
                                                )
                                        )[0] && (
                                            <img
                                                src={
                                                    review.product
                                                        .productImages[0].image
                                                }
                                                alt={review.product.productName}
                                                className="w-[40rem] border-r-2 border-r-[#560000]"
                                            />
                                        )}
                                        <div className="flex flex-col items-start justify-start p-8 w-full gap-5 h-auto">
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
                                                            fontSize: "3.2rem",
                                                            color: "#560000",
                                                        }}
                                                    />
                                                </button>
                                                <button>
                                                    <Delete
                                                        style={{
                                                            fontSize: "3.2rem",
                                                            color: "#560000",
                                                        }}
                                                    />
                                                </button>
                                            </div>
                                            <p className="text-2xl text-[#560000] font-medium">
                                                Reviewed On:{" "}
                                                {review.created_at_formatted}
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
                                                {review.product.productBrand}
                                            </h2>
                                            <h2 className="font-merriweather text-2xl font-semibold w-full">
                                                {review.product.productName}
                                            </h2>

                                            {reviewFormState.isVisible &&
                                                reviewFormState.review?.id ===
                                                    review.id && (
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

                                            <Ratings rating={review.rating} />
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
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserReviews;
