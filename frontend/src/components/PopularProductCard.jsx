import React, { useEffect, useState } from "react";

function PopularProductCard({ slides }) {
    const [currSlide, setCurrSlide] = useState(0);
    function nextSlide() {
        const next = currSlide + 1 >= slides.length ? 0 : currSlide + 1;
        setCurrSlide(next);
    }

    function prevSlide() {
        const prev = currSlide - 1 < 0 ? slides.length - 1 : currSlide - 1;
        setCurrSlide(prev);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, [currSlide, nextSlide]);
    return (
        <>
            <div className="slides" style={{ transform: `translateX(-${currSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="slide">
                        {slide.content}
                    </div>
                ))}
            </div>
            <button className="prev" onClick={prevSlide}>
                &#10094;
            </button>
            <button className="next" onClick={nextSlide}>
                &#10095;
            </button>
        </>
    );
}

export default PopularProductCard;
