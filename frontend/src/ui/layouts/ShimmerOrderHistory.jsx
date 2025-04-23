import React from "react";

function ShimmerOrderHistory() {
    return (
        <div className="order-history-container flex flex-col items-center justify-center m-8 min-h-[35rem] w-full">
            <div className="history-info-container p-12 flex flex-col items-center justify-center gap-12 w-full">
                <div className="flex items-center justify-center gap-[40rem] w-full">
                    <div className="bg-gray-300 h-10 w-full mb-4 animate-pulse"></div>
                    <div className="bg-gray-300 h-10 w-full mb-4 animate-pulse"></div>
                </div>
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className="order-card p-8 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] w-full flex flex-col gap-10"
                    >
                        <div className="bg-gray-300 h-8 w-1/2 mb-4 animate-pulse"></div>
                        <div className="bg-gray-300 h-8 w-1/2 mb-4 animate-pulse"></div>
                        <div className="bg-gray-300 h-8 w-3/4 mb-4 animate-pulse"></div>
                        <div className="bg-gray-300 h-8 w-full mb-4 animate-pulse"></div>
                        <div className="bg-gray-300 h-8 w-1/4 mb-4 animate-pulse"></div>
                        <div className="bg-gray-300 h-8 w-1/4 mb-4 animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShimmerOrderHistory;
