import React, { useState } from "react";
import Message from "./Message";
import {
    Close,
    Edit,
    RateReview,
    Star,
    StarBorder,
    StarHalf,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addReview } from "../actions/reviewActions";

function ReviewForm({ title, toggleReviewForm, method, product, userInfo }) {
    const [reviewData, setReviewData] = useState({
        product: product,
        reviewTitle: "",
        detailedReview: "",
        rating: "",
    });

    const dispatch = useDispatch();

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        console.log(reviewData);
        dispatch(addReview(product.id, reviewData));
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm bg-opacity-75"
            onClick={toggleReviewForm}
        >
            <div
                className="relative w-11/12 max-w-4xl bg-[#e4efe4] rounded-lg p-8 overflow-auto border-2 border-[#014210]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="review-form-container p-6">
                    <div className="pt-12 flex items-center justify-end">
                        <Close
                            className="close-btn cursor-pointer text-[#014210] text-4xl absolute top-8 right-20"
                            style={{ fontSize: "3.6rem" }}
                            onClick={toggleReviewForm}
                        />
                    </div>
                    <h1 className="product-form-title flex items-center justify-center gap-4 text-6xl text-center text-[#014210] font-bold">
                        {title}
                    </h1>
                    <h2 className="flex items-center justify-center gap-4 p-4 text-3xl text-center text-[#560000] font-semibold">
                        {product.productName}
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
                                    htmlFor="reviewTitle"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    Review Title:
                                </label>
                                <input
                                    type="text"
                                    id="reviewTitle"
                                    name="reviewTitle"
                                    value={reviewData.reviewTitle}
                                    onChange={handleChange}
                                    className="form-input w-full p-6 text-[1.8rem] mt-2 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
                                    placeholder="Enter Review Title"
                                    required
                                />
                            </div>

                            {/* Detailed Review */}
                            <div className="input-group mb-4">
                                <label
                                    htmlFor="detailedReview"
                                    className="text-[1.8rem] font-semibold text-[#014210]"
                                >
                                    Detailed Review:
                                </label>
                                <textarea
                                    id="detailedReview"
                                    name="detailedReview"
                                    value={reviewData.detailedReview}
                                    onChange={handleChange}
                                    className="form-input w-full p-6 text-[1.8rem] mt-2 box-border border rounded-md border-[#ccc] text-[#000] bg-[#f8f6f6]"
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
                            className={`form-btn flex items-center justify-center gap-4 w-full p-6 border-[3px] rounded-md text-[2.4rem] font-semibold transition-all ease-linear duration-1000 ${
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
