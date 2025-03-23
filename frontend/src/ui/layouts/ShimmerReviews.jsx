import React from "react";

function ShimmerReviews() {
    return (
        <div className="reviews-container p-8 min-h-[35rem] flex items-start justify-between gap-8">
            <div className="reviews w-full">
                <div className="reviews-container p-16">
                    <div className="flex items-center justify-evenly gap-[75rem] w-full">
                        <div className="bg-gray-300 h-12 w-1/4 mb-4 animate-pulse"></div>
                        <div className="bg-gray-300 h-12 w-1/4 mb-4 animate-pulse"></div>
                    </div>
                    <ul className="grid grid-cols-2 items-center justify-center gap-12 p-8 w-full">
                        {[...Array(4)].map((_, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-start border-2 border-[#014210] rounded-lg w-full bg-[#e4efe4] p-8"
                            >
                                <div className="w-[60rem]">
                                    <div className="bg-gray-300 h-[25rem] border-r-2 border-r-[#560000] w-full mb-4 animate-pulse"></div>
                                </div>
                                <div className="flex flex-col items-start justify-start px-8 w-full gap-5 h-auto">
                                    <div className="bg-gray-300 h-8 w-1/2 mb-4 animate-pulse"></div>
                                    <div className="bg-gray-300 h-8 w-1/2 mb-4 animate-pulse"></div>
                                    <div className="bg-gray-300 h-8 w-3/4 mb-4 animate-pulse"></div>
                                    <div className="bg-gray-300 h-8 w-full mb-4 animate-pulse"></div>
                                    <div className="bg-gray-300 h-8 w-1/4 mb-4 animate-pulse"></div>
                                    <div className="bg-gray-300 h-8 w-1/4 mb-4 animate-pulse"></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ShimmerReviews;
