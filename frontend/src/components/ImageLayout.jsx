import React from "react";

function ImageLayout({
    imgPath,
    imgAlt,
    height,
    width,
    className,
    backgroundColor,
    color,
    imgPrice,
}) {
    return (
        <div className={`image-layout-card ${className}`} style={{ backgroundColor, color }}>
            <img src={imgPath} alt={imgAlt} style={{ height, width }} />
            <div className="img-info">
                <h3 className="img-title">{imgAlt}</h3>
                <h4 className="img-price">₹ {imgPrice}</h4>
            </div>
        </div>
    );
}

export default ImageLayout;
