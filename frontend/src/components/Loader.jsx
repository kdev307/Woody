import React from "react";

function Loader() {
    return (
        <div className="loading-container p-auto flex items-center justify-center">
            <div className="loader m-8 border-10 border-[#c2daba] border-t-8 border-t-[#014210] rounded-full w-40 h-40 animate-spin"></div>
        </div>
    );
}

export default Loader;
