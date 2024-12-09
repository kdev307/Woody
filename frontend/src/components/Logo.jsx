import React from "react";

function Logo() {
    return (
        <div className="flex flex-col items-center justify-center text-center uppercase brightness-175">
            <div className="font-merriweather font-semibold text-[#560000] text-2xl tracking-[2px] -mb-12">
                Inspired by Nature
            </div>
            <div className="font-playfair text-[9rem] font-bold text-[#014210]">
                Woody
            </div>
            <div className="font-merriweather font-semibold text-[#560000] text-2xl tracking-[2px] -mt-8">
                Designed for Life
            </div>
        </div>
    );
}

export default Logo;
