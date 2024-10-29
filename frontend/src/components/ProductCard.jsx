import React from "react";
import { Star } from "@mui/icons-material";
import { Link } from "react-router-dom";

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

export default ProductCard;
