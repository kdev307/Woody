import React from "react";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <>
            <div
                className="hero bg-cover bg-center w-full h-lvh flex flex-col justify-start items-center text-center gap-2 -mt-[9.6rem] "
                style={{ backgroundImage: 'url("/images/hero.png")' }}
                id="hero"
            >
                <h1 className="hero-title p-8  mt-[16rem] text-9xl font-semibold">
                    From Nature's Heart to Your Home
                </h1>
                <p className="hero-desc p-4 text-2xl font-medium text-center">
                    {/* Discover timeless designs. Experience the harmony of nature in every
          piece. */}
                    Experience the perfect blend of style, comfort, and nature.
                </p>
                <Link
                    to="/store"
                    className="hero-btn text-white bg-[#560000] p-4 rounded-xl w-[12%] font-semibold text-2xl text-center mt-[1rem] mb-8 mx-16 hover:bg-white hover:text-[#560000] transition-all ease-in-out duration-1000"
                >
                    Shop Now
                </Link>
            </div>
        </>
    );
}

export default Hero;
