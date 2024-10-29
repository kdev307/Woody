import React from "react";
import ProductCard from "./ProductCard";

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

export default Products;
