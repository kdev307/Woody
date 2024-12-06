import React from "react";
// import "../styles/logo.css"

function Logo() {
    return (
        <div className="flex flex-col items-center justify-center text-center uppercase brightness-175">
            <div className="font-merriweather font-semibold text-[#560000] text-base tracking-[2px] mt-1 mb-[-0.8rem]">
                Inspired by Nature
            </div>
            <div className="font-playfair text-8xl font-medium text-[#014210]">
                Woody
            </div>
            <div className="font-merriweather font-semibold text-[#560000] text-base tracking-[2px] mt-[0.2rem] mb-[0.2rem]">
                Designed for Life
            </div>
        </div>
    );
}

export default Logo;
