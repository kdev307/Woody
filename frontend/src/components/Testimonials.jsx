import React from "react";
import "../styles/common.css";
import "../styles/testimonials.css";
import { FormatQuote } from "@mui/icons-material";

function Testimonials() {
    const testimonialList = [
        {
            image: "/images/testimonials/customer-1.jpg",
            name: "Tia Sen",
            review: "Absolutely love this sofa! It’s incredibly comfortable and fits perfectly in my living room. The fabric is soft and durable, making it ideal for cozy family movie nights. I couldn't have asked for a better addition to my home.",
        },
        {
            image: "/images/testimonials/customer-4.jpg",
            name: "Ivan Hughes",
            review: "Delivery was quick, and the bed frame looks amazing in our bedroom. It has a modern design and is very sturdy. I appreciate the attention to detail in the craftsmanship, and it really elevates the look of our space.",
        },
        {
            image: "/images/testimonials/customer-2.jpg",
            name: "Yuna Cho",
            review: "The dining table is stunning and very sturdy. It seats six comfortably and has become the centerpiece of our family gatherings. The quality is exceptional, and I feel like I got great value for the price!",
        },
        {
            image: "/images/testimonials/customer-5.jpg",
            name: "Dave Bryson",
            review: "I was skeptical at first, but the quality of this furniture is excellent. The design is both stylish and functional. I’m very happy with my purchase and would highly recommend it to anyone looking for quality pieces.",
        },
        {
            image: "/images/testimonials/customer-3.jpg",
            name: "Sophia Watson",
            review: "This chair is not only stylish but also super comfortable. It provides excellent support, making it perfect for long reading sessions. I highly recommend it to anyone looking to add a touch of elegance to their space.",
        },
        {
            image: "/images/testimonials/customer-6.jpg",
            name: "Kwame Mensah",
            review: "I adore my new bookshelf! It’s not only functional but also adds a touch of warmth to my study. The wood finish is gorgeous, and it holds all my books with ease. Highly recommend!",
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
                                <Testimonial testimonial={testimonial} />
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

function Testimonial({ testimonial }) {
    return (
        <>
            <div className="testimonial-image">
                <img src={testimonial.image} alt={testimonial.name} />
            </div>
            <div className="testimonial-info">
                <p className="testimonial-review">{testimonial.review}</p>
                <h3 className="testimonial-name">{testimonial.name}</h3>
            </div>
        </>
    );
}

export default Testimonials;
