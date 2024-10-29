import React from "react";

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

export default ProductFilters;
