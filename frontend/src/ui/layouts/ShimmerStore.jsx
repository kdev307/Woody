import React from "react";

function ShimmerStore() {
    return (
        <div className="animate-pulse">
            <div className="grid grid-cols-4 sm_desk:grid-cols-3 tab:grid-cols-2 mob:grid-cols-1 gap-4">
                {Array(8)
                    .fill("")
                    .map((_, index) => (
                        <div
                            key={index}
                            className="bg-gray-200 h-[48rem] rounded-lg shadow-md"
                        ></div>
                    ))}
            </div>
        </div>
    );
}

export default ShimmerStore;
