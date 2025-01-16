import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";

function UserReviews() {
    return (
        <>
            <Navbar />
            <div className="reviews-container p-8 min-h-[35rem] flex items-start justify-between gap-8">
                <div className="reviews w-full">
                    <h1 className="sub-heading text-7xl font-bold p-8 flex items-center justify-center gap-8">
                        My Reviews
                    </h1>
                    <div className="reviews-container"></div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserReviews;
