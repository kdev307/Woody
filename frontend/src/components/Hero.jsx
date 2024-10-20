import React from "react";
import "../styles/common.css";
import "../styles/hero.css";

function Hero() {
    return (
        <>
            <div className="hero" style={{ background: 'url("/images/hero.png")' }}>
                <h1 className="hero-title">Woody Inspired by Nature, Designed for Life</h1>
                <button className="hero-btn">Shop Now</button>
            </div>
        </>
    );
}

export default Hero;
