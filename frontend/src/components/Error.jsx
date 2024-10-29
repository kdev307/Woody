import React from "react";

function Error({ message }) {
    return (
        <div className="error">
            <h2>Something Went Wrong! :(</h2>
            <span>⛔ Error : </span>
            {message}
        </div>
    );
}

export default Error;
