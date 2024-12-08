import React from "react";

function Logo() {
    return (
        <div className="flex flex-col items-center justify-center text-center uppercase brightness-175 2xl:mt-8">
            <div className="font-merriweather font-semibold text-[#560000] lg:text-base xl:text-sm 2xl:text-lg tracking-[2px] mt-1 mb-[-0.8rem]">
                Inspired by Nature
            </div>
            <div className="font-playfair lg:text-7xl text-8xl 2xl:text-[6rem] font-semibold text-[#014210]">
                Woody
            </div>
            <div className="font-merriweather font-semibold text-[#560000] lg:text-base 2xl:text-lg tracking-[2px] mt-[0.2rem] mb-[0.2rem] xl:text-sm">
                Designed for Life
            </div>
        </div>
    );
}

export default Logo;
