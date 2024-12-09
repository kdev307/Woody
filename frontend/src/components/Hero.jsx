import React from "react";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <>
            <div
                className="hero bg-cover bg-center w-full h-screen flex flex-col justify-start items-center text-center gap-12 -mt-[14.5rem] "
                style={{ backgroundImage: 'url("/images/hero.png")' }}
                id="hero"
            >
                <h1 className="hero-title p-8 mt-96 text-8xl lg_tab:text-7xl sm_tab:text-[4.8rem] font-bold mob:mt-84">
                    From Nature's Heart to Your Home
                </h1>
                <p className="hero-desc p-8 lg_tab:-mt-8 text-4xl font-medium text-center text-black">
                    {/* Discover timeless designs. Experience the harmony of nature in every
          piece. */}
                    Experience the perfect blend of style, comfort, and nature.
                </p>
                <button className="hero-btn text-white bg-[#560000] py-8 px-16 rounded-2xl font-bold text-5xl lg_tab:text-5xl lg_tab:py-6 lg_tab:px-12 tab:text-4xl text-center mt-[1rem] mb-8 mx-16 hover:bg-white hover:text-[#560000] transition-all ease-in-out duration-1000">
                    <Link to="/store">Shop Now</Link>
                </button>
            </div>
        </>
    );
}

export default Hero;
