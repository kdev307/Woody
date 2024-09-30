import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function Home() {
    return (
        <div className="home-page">
            <Navbar />
            <Hero />
            <Footer />
        </div>
    );
}

export default Home;
