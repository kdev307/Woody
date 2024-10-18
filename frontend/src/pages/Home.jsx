import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import PopularProduct from "../components/PopularProduct";
import Benefits from "../components/Benefits";
import Categories from "../components/Categories";

function Home() {
    return (
        <div className="home-page">
            <Navbar />
            <Hero />
            <Categories />
            <PopularProduct />
            <Benefits />
            <Footer />
        </div>
    );
}

export default Home;
