import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import PopularProduct from "../components/PopularProduct";
import Benefits from "../components/Benefits";

function Home() {
    return (
        <div className="home-page">
            <Navbar />
            <Hero />
            <PopularProduct />
            <Benefits />
            <Footer />
        </div>
    );
}

export default Home;
