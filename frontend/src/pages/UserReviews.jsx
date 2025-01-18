import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
                                        className="flex items-center justify-start border-2 rounded-lg w-full bg-[#e4efe4]"
                                    >
                                        <img
                                            src={review.product_image}
                                            alt={review.product_image}
                                            className="w-[32rem]"
                                        />
                                        <div className="flex flex-col items-start justify-start p-10 w-full gap-10">
                                            <div className="review-btns flex self-end items-center justify-center gap-8">
                                                <Edit
                                                    style={{
                                                        fontSize: "3rem",
                                                        color: "#560000",
                                                    }}
                                                />
                                                <Delete
                                                    style={{
                                                        fontSize: "3rem",
                                                        color: "#560000",
                                                    }}
                                                />
                                            </div>
                                            <p className="text-2xl text-[#560000] font-medium">
                                                Reviewed On:{" "}
                                                {review.created_at_formatted}
                                            </p>
                                            <Ratings rating={review.rating} />
                                            <h2 className="font-playfair text-4xl font-semibold w-full">
                                                {review.review_title}
                                            </h2>
                                            <p className="font-mono text-2xl font-medium w-full max-h-[6rem] overflow-auto scrollbar-none">
                                                {review.review_comment}
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
