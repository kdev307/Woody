import React, { useState } from "react";
import "../styles/common.css";
import "../styles/categories.css";

function Categories() {
    const categoriesData = [
        {
            name: "Bedroom",
            images: [
                "/images/category/bed1.jpg",
                "/images/category/bed2.jpg",
                "/images/category/bed3.jpg",
                "/images/category/bed4.jpg",
                "/images/category/bed5.jpg",
                "/images/category/bed6.jpg",
                "/images/category/bed7.jpg",
                "/images/category/bed8.jpg",
            ],
        },
        {
            name: "Baby Room",
            images: [
                "/images/category/baby1.jpg",
                "/images/category/baby2.jpg",
                "/images/category/baby3.jpg",
                "/images/category/baby4.jpg",
                "/images/category/baby5.jpg",
                "/images/category/baby6.jpg",
                "/images/category/baby7.jpg",
                "/images/category/baby8.jpg",
            ],
        },
        {
            name: "Dining Room",
            images: [
                "/images/category/dining1.jpg",
                "/images/category/dining2.jpg",
                "/images/category/dining3.jpg",
                "/images/category/dining4.jpg",
                "/images/category/dining5.jpg",
                "/images/category/dining6.jpg",
                "/images/category/dining7.jpg",
                "/images/category/dining8.jpg",
            ],
        },
        {
            name: "Outdoor",
            images: [
                "/images/category/outdoor1.jpg",
                "/images/category/outdoor2.jpg",
                "/images/category/outdoor3.jpg",
                "/images/category/outdoor4.jpg",
                "/images/category/outdoor5.jpg",
                "/images/category/outdoor6.jpg",
                "/images/category/outdoor7.jpg",
                "/images/category/outdoor8.jpg",
            ],
        },
        {
            name: "Living Room",
            images: [
                "/images/category/living1.jpg",
                "/images/category/living2.jpg",
                "/images/category/living3.jpg",
                "/images/category/living4.jpg",
                "/images/category/living5.jpg",
                "/images/category/living6.jpg",
                "/images/category/living7.jpg",
                "/images/category/living8.jpg",
            ],
        },
        {
            name: "Workspace",
            images: [
                "/images/category/office1.jpg",
                "/images/category/office2.jpg",
                "/images/category/office3.jpg",
                "/images/category/office4.jpg",
                "/images/category/office5.jpg",
                "/images/category/office6.jpg",
                "/images/category/office7.jpg",
                "/images/category/office8.jpg",
            ],
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState(categoriesData[0]);

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <div className="categories-section">
                <h2 className="sub-heading">Explore By Category</h2>
                <div className="category-container">
                    <ul className="category-options">
                        {categoriesData.map((category) => {
                            return (
                                <li
                                    key={category.name}
                                    className={`category ${
                                        selectedCategory.name === category.name ? "active" : ""
                                    }`}
                                    onClick={() => handleCategoryFilter(category)}
                                >
                                    {category.name}
                                </li>
                            );
                        })}

                        <button className="category-btn">All Categories</button>
                    </ul>
                    <div className="category-images">
                        {selectedCategory.images.map((image, index) => {
                            return <img key={index} src={image} alt={selectedCategory.name} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Categories;
