import React from "react";

function Message({ messageType, message }) {
    return (
        <div className="message flex flex-col items-center justify-center gap-4 mt-12">
            <h2 className="text-4xl font-semibold text-[#560000]">
                {messageType === "success"
                    ? "Successful :)"
                    : "Something went Wrong :("}
            </h2>
            <span className="text-3xl text-[#560000] font-medium">
                {messageType === "success" ? "✅" : "⛔"} : {message}
            </span>
        </div>
    );
}

export default Message;
