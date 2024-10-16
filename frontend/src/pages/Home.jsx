import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import PopularProduct from "../components/PopularProduct";

function Home() {
    return (
        <div className="home-page">
            <Navbar />
            <Hero />
            <PopularProduct />
            <Footer />
        </div>
    );
}

export default Home;
