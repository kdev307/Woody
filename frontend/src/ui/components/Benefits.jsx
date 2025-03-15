import React from "react";
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
            icon: <SupportAgent style={{ fontSize: "4.8rem" }} />,
            title: "24/7 Customer Support",
            description: "We're here to assist you anytime.",
        },
        {
            icon: <ViewList style={{ fontSize: "4.8rem" }} />,
            title: "Wide Selection",
            description: "Explore a diverse range of products.",
        },
        {
            icon: <LocalShipping style={{ fontSize: "4.8rem" }} />,
            title: "Fast and Free Shipping",
            description: "Quick shipping on all orders, no minimum.",
        },
        {
            icon: <ShoppingCart style={{ fontSize: "4.8rem" }} />,
            title: "Easy to Shop",
            description: "Enjoy a user-friendly shopping experience.",
        },
        {
            icon: <Autorenew style={{ fontSize: "4.8rem" }} />,
            title: "Hassle-Free Returns",
            description: "Return any item within 30 days for a refund.",
        },
        {
            icon: <Lock style={{ fontSize: "4.8rem" }} />,
            title: "Secure Payments",
            description: "Transactions are protected with encryption.",
        },
        {
            icon: <ThumbUp style={{ fontSize: "4.8rem" }} />,
            title: "Quality Assurance",
            description: "All products meet high-quality standards.",
        },
        {
            icon: <CheckCircle style={{ fontSize: "4.8rem" }} />,
            title: "Satisfaction Guarantee",
            description: "We offer a hassle-free satisfaction guarantee.",
        },
    ];

    return (
        <>
            <div className="benefits-section bg-[#c2daba] p-4 m-auto">
                <h2 className="sub-heading text-6xl font-bold text-center sm_tab:text-[3.6rem] mb-24 py-8">
                    Benefits for your Expendiency
                </h2>
                <div className="benefits grid grid-cols-4 lg_tab:grid-cols-3 sm_tab:grid-cols-2 mob:grid-cols-2 items-center justify-center gap-y-16 mb-12">
                    {benefitsList.map((benefit, index) => {
                        return (
                            <div
                                className="benefit flex flex-col text-center self-center"
                                key={index}
                            >
                                <div className="icon text-center">
                                    {benefit.icon}
                                </div>
                                <h3 className="benefit-title text-4xl tab:text-3xl font-semibold">
                                    {benefit.title}
                                </h3>
                                <p className="benefit-desc text-2xl">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Benefits;
