import React, { useEffect, useState } from "react";
import Message from "./Message";
import { Close, Star, StarBorder, StarHalf } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
    addReview,
    editReview,
    fetchUserReviews,
} from "../../redux/actions/reviewActions";
import { listProductDetail } from "../../redux/actions/productActions";

function ReviewForm({
    title,
    toggleReviewForm,
    method,
    product,
    userInfo,
    review = null,
}) {
    console.log("Product & review  received:", review);
    const [reviewData, setReviewData] = useState({
        product: product,
        review_title: review?.review_title || "",
        review_comment: review?.review_comment || "",
        rating: review?.rating || "",
    });

    // useEffect(() => {
    //     if (review) {
    //         console.log("Review received in ReviewForm:", review?.id, review);
    //         setReviewData({
    //             product: review.product,
    //             review_title: review?.review_title || "",
    //             review_comment: review?.review_comment || "",
    //             rating: review?.rating || "",
    //         });
    //     }
    // }, [review]);

    const dispatch = useDispatch();

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        console.log(reviewData);
        if (method === "addReview") dispatch(addReview(product.id, reviewData));
        else dispatch(editReview(product.id, review.id, reviewData));
        setReviewData({
            review_title: "",
            review_comment: "",
            rating: "",
        });
        toggleReviewForm();
        dispatch(fetchUserReviews(userInfo.id));
        dispatch(listProductDetail(product.id));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewData({
            ...reviewData,
            [name]: value,
        });
    };

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm bg-opacity-75 shadow-none"
            onClick={toggleReviewForm}
        >
            <div
                className="relative w-11/12 max-w-4xl bg-[#e4efe4] rounded-lg p-8 overflow-auto border-2 border-[#014210]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="review-form-container p-6">
                    <div className="pt-12 flex items-center justify-end">
                        <Close
                            className="close-btn cursor-pointer text-[#014210] text-4xl absolute top-8 right-10"
                            style={{ fontSize: "3.6rem" }}
                            onClick={toggleReviewForm}
                        />
                    </div>
                    <h1 className="product-form-title flex items-center justify-center gap-4 text-6xl text-center text-[#014210] font-bold">
                        {title}
                    </h1>
                    <h2 className="flex items-center justify-center gap-4 p-4 text-3xl text-center text-[#560000] font-semibold">
                        {product.productBrand + " - " + product.productName}
                    </h2>
                    {message && (
                        <Message message={message} messageType={messageType} />
                    )}
                    <form
                        className="form-container flex flex-col p-4 gap-8 items-center justify-center text-left rounded-2xl"
                        onSubmit={handleReviewSubmit}
                    >
                        <div className="form-inputs w-full mx-auto p-8">
                            {/* Review Title */}
                            <div className="input-group mb-4">
                                <label
                                    htmlFor="review_title"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    Review Title:
                                </label>
                                <input
                                    type="text"
                                    id="review_title"
                                    name="review_title"
                                    value={reviewData.review_title}
                                    onChange={handleChange}
                                    className="form-input w-full p-6 text-[1.8rem] mt-2 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    placeholder="Enter Review Title"
                                    required
                                />
                            </div>

                            {/* Detailed Review */}
                            <div className="input-group mb-4">
                                <label
                                    htmlFor="review_comment"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    Detailed Review:
                                </label>
                                <textarea
                                    id="review_comment"
                                    name="review_comment"
                                    value={reviewData.review_comment}
                                    onChange={handleChange}
                                    className="form-input w-full min-h-[4rem] p-6 text-[1.8rem] mt-2 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    placeholder="Enter your detailed review here"
                                    required
                                />
                            </div>

                            {/* Rating Section */}
                            <div className="input-group mb-4">
                                <label
                                    htmlFor="reviewRating"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    Rate this Product:
                                </label>
                                <div className="flex items-center justify-start gap-2">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() => {
                                                const newRating =
                                                    reviewData.rating ===
                                                    value - 0.5
                                                        ? value
                                                        : value - 0.5;
                                                setReviewData({
                                                    ...reviewData,
                                                    rating: newRating,
                                                });
                                            }}
                                            className={`text-3xl ${
                                                reviewData.rating >= value
                                                    ? "text-[#560000]"
                                                    : reviewData.rating >=
                                                      value - 0.5
                                                    ? "text-[#560000]"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            {reviewData.rating >= value ? (
                                                <Star
                                                    style={{
                                                        fontSize: "3.2rem",
                                                    }}
                                                />
                                            ) : reviewData.rating >=
                                              value - 0.5 ? (
                                                <StarHalf
                                                    style={{
                                                        fontSize: "3.2rem",
                                                    }}
                                                />
                                            ) : (
                                                <StarBorder
                                                    style={{
                                                        fontSize: "3.2rem",
                                                    }}
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="text-[2rem] font-semibold text-[#014210] mt-4">
                                    Rating: {reviewData.rating} / 5
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            className={`form-btn flex items-center justify-center gap-4 w-full p-3 border-[3px] rounded-md text-[2.4rem] font-semibold transition-all ease-linear duration-1000 ${
                                !userInfo
                                    ? "cursor-not-allowed text-[#888] border-[#888] hover:text-[#888] hover:border-[#888]"
                                    : "border-[#014210] text-[#014210] hover:bg-[#014210] hover:text-white"
                            }`}
                            type="submit"
                            disabled={!userInfo}
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReviewForm;
