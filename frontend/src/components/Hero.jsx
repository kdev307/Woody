import React from "react";
import "../styles/common.css";
import "../styles/hero.css";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <>
            <div className="hero" style={{ background: 'url("/images/hero.png")' }}>
                <h1 className="hero-title">Woody Inspired by Nature, Designed for Life</h1>
                <Link to="/store" className="hero-btn">
                    Shop Now
                </Link>
            </div>
        </>
    );
}

export default Hero;
