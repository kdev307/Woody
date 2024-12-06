import React from "react";
// import "../styles/loader.css";

function Loader() {
    return (
        <div className="loading-container p-auto flex items-center justify-center">
            <div className="loader m-8 border-8 border-[#c2daba] border-t-8 border-t-[#014210] rounded-full w-20 h-20 animate-spin"></div>
        </div>
    );
}

export default Loader;
