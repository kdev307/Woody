import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductFilters from "../components/ProductFilters";
import Products from "../components/Products";
import "../styles/common.css";
import "../styles/store.css";

export default function Store() {
    const productFilters = [
        "Bedroom",
        "Baby Room",
        "Chairs",
        "Dining Room",
        "Outdoor",
        "Living Room",
        "Tables",
        "Workspace",
    ];
    const productsList = [
        {
            id: "1",
            name: "Cozy Bed",
            category: "Bedroom",
            image: "https://example.com/images/cozy-bed.jpg",
            price: "15000",
            description: "A cozy bed with a stylish design for ultimate comfort.",
            rating: "4.5",
        },
        {
            id: "2",
            name: "Wooden Crib",
            category: "Baby Room",
            image: "https://example.com/images/wooden-crib.jpg",
            price: "8000",
            description: "A safe and sturdy wooden crib for your little one.",
            rating: "4.8",
        },
        {
            id: "3",
            name: "Elegant Dining Table",
            category: "Dining Room",
            image: "https://example.com/images/elegant-dining-table.jpg",
            price: "25000",
            description: "An elegant dining table that seats six comfortably.",
            rating: "4.7",
        },
        {
            id: "4",
            name: "Outdoor Lounge Chair",
            category: "Outdoor",
            image: "https://example.com/images/outdoor-lounge-chair.jpg",
            price: "12000",
            description: "A stylish lounge chair perfect for your patio or garden.",
            rating: "4.6",
        },
        {
            id: "5",
            name: "Modern Sofa",
            category: "Living Room",
            image: "https://example.com/images/modern-sofa.jpg",
            price: "30000",
            description: "A modern sofa that adds elegance to your living space.",
            rating: "4.9",
        },
        {
            id: "6",
            name: "Ergonomic Office Chair",
            category: "Workspace",
            image: "https://example.com/images/ergonomic-office-chair.jpg",
            price: "10000",
            description: "An ergonomic chair designed for comfort during long hours of work.",
            rating: "4.4",
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState("All");

    const handleCategoryFilter = (category) => {
        setSelectedCategory((prevCategory) => (prevCategory === category ? "All" : category));
    };

    const filteredProducts =
        selectedCategory === "All"
            ? productsList
            : productsList.filter((product) => product.category === selectedCategory);

    return (
        <>
            <Navbar />
            <div className="store-container">
                {/* <h1>Hello World ! This hello is from store page.</h1> */}
                <ProductFilters
                    productFilters={productFilters}
                    selectedCategory={selectedCategory}
                    handleCategoryFilter={handleCategoryFilter}
                />
                <Products productsList={filteredProducts} />
            </div>
            <Footer />
        </>
    );
}
