import React from "react";
import "../styles/common.css";
import "../styles/benefits.css";
import {
    SupportAgent,
    LocalShipping,
    ShoppingCart,
    Autorenew,
    Lock,
    ThumbUp,
    ViewList,
    CheckCircle,
} from "@mui/icons-material";

function Benefits() {
    const benefitsList = [
        {
            icon: <SupportAgent style={{ fontSize: "3.2rem" }} />,
            title: "24/7 Customer Support",
            description: "We're here to assist you anytime.",
        },
        {
            icon: <LocalShipping style={{ fontSize: "3.2rem" }} />,
            title: "Fast and Free Shipping",
            description: "Quick shipping on all orders, no minimum.",
        },
        {
            icon: <ShoppingCart style={{ fontSize: "3.2rem" }} />,
            title: "Easy to Shop",
            description: "Enjoy a user-friendly shopping experience.",
        },
        {
            icon: <Autorenew style={{ fontSize: "3.2rem" }} />,
            title: "Hassle-Free Returns",
            description: "Return any item within 30 days for a refund.",
        },
        {
            icon: <Lock style={{ fontSize: "3.2rem" }} />,
            title: "Secure Payments",
            description: "Transactions are protected with encryption.",
        },
        {
            icon: <ThumbUp style={{ fontSize: "3.2rem" }} />,
            title: "Quality Assurance",
            description: "All products meet high-quality standards.",
        },
        {
            icon: <ViewList style={{ fontSize: "3.2rem" }} />,
            title: "Wide Selection",
            description: "Explore a diverse range of products.",
        },
        {
            icon: <CheckCircle style={{ fontSize: "3.2rem" }} />,
            title: "Satisfaction Guarantee",
            description: "We offer a hassle-free satisfaction guarantee.",
        },
    ];

    return (
        <>
            <div className="benefits-section">
                <h2 className="sub-heading">Benefits for your Expendiency</h2>
                <div className="benefits">
                    {/* {benefitsList.map((benefit, index) => (
                        <div
                            key={index}
                            style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
                        >
                            <div style={{ marginRight: "8px" }}>{benefit.icon}</div>
                            <div>
                                <h4>{benefit.title}</h4>
                                <p>{benefit.description}</p>
                            </div>
                        </div>
                    ))} */}
                    {benefitsList.map((benefit, index) => {
                        return (
                            <div className="benefit" key={index}>
                                <div className="icon">{benefit.icon}</div>
                                <h3 className="benefit-title">{benefit.title}</h3>
                                <p className="benefit-desc">{benefit.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Benefits;
