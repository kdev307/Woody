import React from "react";

function ShimmerProduct() {
    return (
        <div className="product p-8 grid grid-cols-[2fr_3fr] tab:flex tab:flex-col tab:items-start tab:justify-start gap-8 sm_desk:gap-20 items-start justify-center text-xl bg-[#e4efe4] pt-32 min-h-[35rem] animate-pulse">
            <div className="image-container overflow-hidden gap-4 self-center w-[100%] sm_desk:w-[105%] lg_tab:w-[108%] tab:w-[80%] sm_tab:w-[95%]">
                <div className="w-full h-[60rem] bg-gray-300 rounded-lg"></div>
            </div>
            <div className="product-info-container flex flex-col items-start justify-center gap-6">
                <div className="product-main-info flex flex-col items-start justify-center text-left">
                    <div className="w-1/2 h-12 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="w-3/4 h-12 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="flex flex-wrap items-center justify-start gap-2 mt-2 p-2">
                        <div className="w-24 h-12 bg-gray-300 rounded-lg"></div>
                        <div className="w-24 h-12 bg-gray-300 rounded-lg"></div>
                        <div className="w-24 h-12 bg-gray-300 rounded-lg"></div>
                    </div>
                </div>
                <ul className="info-btns flex items-center justify-center text-center gap-8 p-0 m-auto border-2 rounded-[4rem] bg-[#ddd] transition-all ease-in-out duration-1000">
                    <li>
                        <div className="w-32 h-12 bg-gray-300 rounded-lg"></div>
                    </li>
                    <li>
                        <div className="w-32 h-12 bg-gray-300 rounded-lg"></div>
                    </li>
                    <li>
                        <div className="w-32 h-12 bg-gray-300 rounded-lg"></div>
                    </li>
                </ul>
                <div className="content py-4 px-8 max-h-[40rem] min-h-[40rem] mx-auto w-[95%] text-left indent-4 overflow-y-auto scrollbar">
                    <div className="w-full h-8 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="w-full h-8 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="w-full h-8 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="w-full h-8 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="w-full h-8 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="w-full h-8 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="w-full h-8 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="w-full h-8 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="w-full h-8 bg-gray-300 rounded-lg mb-4"></div>
                </div>
                <div className="product-action m-auto flex items-center justify-center gap-40 sm_desk:gap-30 lg_tab:gap-20 font-bold text-[#014210]">
                    <div className="rating flex items-center justify-center text-4xl">
                        <div className="w-16 h-12 bg-gray-300 rounded-lg"></div>
                    </div>
                    <div className="w-48 h-12 bg-gray-300 rounded-lg"></div>
                    <div className="w-48 h-12 bg-gray-300 rounded-lg"></div>

                    <div className="w-24 h-12 bg-gray-300 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}

export default ShimmerProduct;
