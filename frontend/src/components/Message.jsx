import React from "react";

function Message({ messageType, message }) {
    return (
        <div className="message">
            <h2>{messageType === "success" ? "Successful :)" : "Something went Wrong :("}</h2>
            <span>{messageType === "success" ? "✅" : "⛔"} : </span>
            {message}
        </div>
    );
}

export default Message;
