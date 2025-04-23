import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import PopularProduct from "../components/PopularProduct";
import Benefits from "../components/Benefits";
import Categories from "../components/Categories";
import Testimonials from "../components/Testimonials";

function Home() {
    return (
        <div className="home-page">
            <Navbar />
            <Hero />
            <Categories />
            <PopularProduct />
            <Benefits />
            <Testimonials />
            <Footer />
        </div>
    );
}

export default Home;
