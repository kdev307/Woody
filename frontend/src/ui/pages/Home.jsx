import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import PopularProduct from "../components/PopularProduct";
import Benefits from "../components/Benefits";
import Categories from "../components/Categories";
import Testimonials from "../components/Testimonials";
import { Element } from "react-scroll";

function Home() {
    return (
        <div className="home-page">
            <Navbar />
            <Element name="hero">
                <Hero />
            </Element>
            <Element name="categories">
                <Categories />
            </Element>
            <Element name="popularProducts">
                <PopularProduct />
            </Element>
            <Benefits />
            <Element name="testimonials">
                <Testimonials />
            </Element>
            <Footer />
        </div>
    );
}

export default Home;
