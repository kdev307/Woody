import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Star } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../styles/common.css";
import "../styles/store.css";

export default function Store() {
    const productFilters = [
        "Accessories",
        "Bedroom",
        "Dining Room",
        "Hallway",
        "Living Room",
        "Nursery",
        "Outdoor",
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
    const [searchQuery, setSearchQuery] = useState("");

    const handleCategoryFilter = (category) => {
        setSelectedCategory((prevCategory) => (prevCategory === category ? "All" : category));
    };

    // const handleSearch = () => {};
    // const filteredProducts =
    //     selectedCategory === "All"
    //         ? productsList
    //         : productsList.filter((product) => product.category === selectedCategory);

    const filteredProducts = productsList
        .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((product) => selectedCategory === "All" || product.category === selectedCategory);

    return (
        <>
            <Navbar />
            <div className="store-container">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search"
                    />
                    {/* <Search style={{ fontSize: "3.6rem", color: "#014210" }} /> */}
                    {/* <button onClick={handleSearch} className="search-button">
                        <Search style={{ fontSize: "3.6rem", color: "#014210" }} />
                    </button> */}
                </div>
                <div className="products-section">
                    <ProductFilters
                        productFilters={productFilters}
                        selectedCategory={selectedCategory}
                        handleCategoryFilter={handleCategoryFilter}
                    />
                    <Products productsList={filteredProducts} />
                </div>
            </div>
            <Footer />
        </>
    );
}

function ProductFilters({ productFilters, selectedCategory, handleCategoryFilter }) {
    return (
        <>
            <ul className="filters-list">
                {productFilters.map((category) => (
                    <li
                        key={category}
                        className={`category ${selectedCategory === category ? "active" : ""}`}
                        onClick={() => handleCategoryFilter(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </>
    );
}

function Products({ productsList }) {
    return (
        <>
            <ul className="products-list">
                {productsList.map((product) => {
                    return (
                        <li key={product.id}>
                            <ProductCard product={product} />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

function ProductCard({ product }) {
    const { name, image, price, rating, description } = product;

    return (
        <div className="product-card">
            <div className="rating">
                <h3>{rating}</h3>
                <Star style={{ textAlign: "center", verticalAlign: "center" }} />
            </div>
            <img src={image} alt={name} className="product-img" />
            <div className="product-info">
                <h3 className="product-name">{name}</h3>
                <p className="product-desc">{description}</p>
                <div>
                    <Link to="/product-detail" element className="detail-btn">
                        View Details
                    </Link>
                    <h3 className="product-price">₹ {price}</h3>
                </div>
            </div>
        </div>
    );
}
