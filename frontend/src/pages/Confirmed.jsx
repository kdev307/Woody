import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
    Celebration,
    CheckCircle,
    Favorite,
    Schedule,
} from "@mui/icons-material";

function Confirmed() {
    return (
        <>
            <Navbar />
            <div className="order-confirmed-container flex flex-col items-center justify-center">
                <h1 class="sub-heading text-7xl font-extrabold p-8 flex items-center justify-center gap-8">
                    Congratulations{" "}
                    <Celebration
                        className="animate-pulse"
                        style={{ fontSize: "5rem" }}
                    />
                </h1>
                <h2 class="sub-heading text-5xl font-semibold p-4">
                    Order Confirmed !
                </h2>
                <img
                    className="w-[30%]"
                    src="images/confirm-truck-2.gif"
                    alt="Gif of Order Delivery Truck"
                />
                <div class="desc flex flex-col items-center justify-center gap-4 p-4">
                    <p className="p-4 flex items-center text-4xl text-[#560000] justify-center gap-4">
                        <CheckCircle
                            style={{ fontSize: "3.2rem", color: "#560000" }}
                        />
                        Your order has been successfully placed.
                    </p>
                    <p className="flex items-center justify-center gap-4 text-[#014210] text-3xl p-4">
                        <Favorite
                            className="animate-bounce"
                            style={{ fontSize: "3.2rem", color: "#014210" }}
                        />
                        Thank you for shopping with us !
                    </p>
                    <p className="flex items-center justify-center gap-4 text-[#560000] text-3xl p-4">
                        {" "}
                        <Schedule
                            style={{ fontSize: "3.2rem", color: "#560000" }}
                        />
                        Your Product will be Delivered{" "}
                        <b>within the next 72 hours (Working Days)</b> from the
                        Date of Purchase. You can track the status here (link of
                        Order History Page).
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Confirmed;
