import React from "react";

function Error({ message }) {
    return (
        <div className="error flex flex-col items-center justify-center gap-4">
            <h2 className="text-4xl text-center font-bold">
                Something Went Wrong! :(
            </h2>
            <div className="text-2xl font-semibold flex flex-col items-center justify-center gap-4">
                <span className="text-3xl">⛔ Error : </span>
                {message}
            </div>
        </div>
    );
}

export default Error;
