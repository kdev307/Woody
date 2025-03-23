import React from "react";

function Loader() {
    return (
        <div className="loading-container p-auto flex flex-col items-center justify-center">
            <div className="loader m-8 border-10 border-[#c2daba] border-t-8 border-t-[#014210] rounded-full w-40 h-40 animate-spin"></div>
            {/* <h2 className="text-3xl font-semibold">
                Hold On, Loading Resources
            </h2> */}
        </div>
    );
}

export default Loader;
