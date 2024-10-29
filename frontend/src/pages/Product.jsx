import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/common.css";
import "../styles/product.css";

function Product() {
    const [activeTab, setActiveTab] = useState("description");
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <>
            <Navbar />
            <div className="product">
                <div className="image-container">
                    <img src="" alt="Hello" />
                </div>
                <div className="info-container">
                    <ul className="info-btns">
                        <li>
                            <button
                                className={`info-btn ${
                                    activeTab === "description" ? "active" : ""
                                }`}
                                onClick={() => handleTabClick("description")}
                            >
                                Description
                            </button>
                        </li>
                        <li>
                            <button
                                className={`info-btn ${
                                    activeTab === "specification" ? "active" : ""
                                }`}
                                onClick={() => handleTabClick("specification")}
                            >
                                Specification
                            </button>
                        </li>
                        <li>
                            <button
                                className={`info-btn ${activeTab === "reviews" ? "active" : ""}`}
                                onClick={() => handleTabClick("reviews")}
                            >
                                Reviews
                            </button>
                        </li>
                    </ul>
                    <div className="content">
                        {activeTab === "description" && (
                            <div className="description">This is the product description.</div>
                        )}
                        {activeTab === "specification" && (
                            <div className="specification">This is the product specification.</div>
                        )}
                        {activeTab === "reviews" && (
                            <div className="reviews">This is the product reviews.</div>
                        )}
                    </div>
                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Product;
