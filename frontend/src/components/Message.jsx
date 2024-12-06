import React from "react";

function Message({ messageType, message }) {
    return (
        <div className="message flex flex-col items-center justify-center gap-4 mt-8">
            <h2 className="text-lg font-semibold">
                {messageType === "success"
                    ? "Successful :)"
                    : "Something went Wrong :("}
            </h2>
            <span className="text-base text-[#560000] font-medium">
                {messageType === "success" ? "✅" : "⛔"} :{message}
            </span>
        </div>
    );
}

export default Message;
