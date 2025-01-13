import React from "react";

function Error({ message }) {
    return (
        <div className="error flex flex-col items-center justify-center gap-4">
            <h2 className="text-4xl text-center">Something Went Wrong! :(</h2>
            <>
                <span>⛔ Error : </span>
                {message}
            </>
        </div>
    );
}

export default Error;
