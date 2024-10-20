import React from "react";
import "../styles/common.css";
import "../styles/testimonials.css";
import { FormatQuote } from "@mui/icons-material";

function Testimonials() {
    const testimonialList = [
        {
            image: "/images/testimonials/customer-1.jpg",
            name: "Tia Sen",
            review: "Absolutely love this sofa! It’s comfortable and fits perfectly in my living room.",
        },
        {
            image: "/images/testimonials/customer-4.jpg",
            name: "Ivan Hughes",
            review: "Delivery was quick and the bed frame looks amazing in our bedroom.",
        },
        {
            image: "/images/testimonials/customer-2.jpg",
            name: "Yuna Cho",
            review: "The dining table is stunning and very sturdy. Great value for the price!",
        },
        {
            image: "/images/testimonials/customer-5.jpg",
            name: "Dave Bryson",
            review: "I was skeptical at first, but the quality of this furniture is excellent. Very happy!",
        },
        {
            image: "/images/testimonials/customer-3.jpg",
            name: "Sophia Watson",
            review: "This chair is not only stylish but also super comfortable. Highly recommend!",
        },
    ];
    return (
        <>
            <div className="testimonials-section">
                <h2 className="sub-heading">Testimonials</h2>
                {/* <p className="quote">&ldquo;</p> */}
                <FormatQuote
                    style={{
                        fontSize: "15rem",
                        transform: "rotateZ(180deg) translate(200%,50%)",
                        color: "#014210",
                        padding: "1.2rem",
                        // paddingTop: "2.4rem",
                        marginTop: "1.2rem",
                    }}
                />
                <ul className="testimonials">
                    {testimonialList.map((testimonial, index) => {
                        return (
                            <li className="testimonial-item" key={index}>
                                <div className="testimonial-image">
                                    <img src={testimonial.image} alt={testimonial.name} />
                                </div>
                                <div className="testimonial-info">
                                    <p className="testimonial-review">{testimonial.review}</p>
                                    <h3 className="testimonial-name">{testimonial.name}</h3>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <p className="endLine">
                    <hr
                        style={{
                            width: "80%",
                            margin: "auto",
                            border: "0.1rem solid #014210",
                            borderRadius: "100rem",
                        }}
                    />
                </p>
            </div>
        </>
    );
}

export default Testimonials;
