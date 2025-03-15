import { Star, StarBorder, StarHalf } from "@mui/icons-material";
import React from "react";

function Ratings({ rating, maxStars = 5 }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    return (
        <div className="ratings-container flex items-center justify-center">
            {Array.from({ length: fullStars }, (_, i) => (
                <Star style={{ color: "#012410", fontSize: "2.8rem" }} />
            ))}
            {hasHalfStar && (
                <StarHalf style={{ color: "#012410", fontSize: "2.8rem" }} />
            )}
            {Array.from({ length: emptyStars }, (_, i) => (
                <StarBorder style={{ color: "#012410", fontSize: "2.8rem" }} />
            ))}
        </div>
    );
}

export default Ratings;
