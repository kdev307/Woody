import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
    Celebration,
    CheckCircle,
    Favorite,
    Schedule,
} from "@mui/icons-material";
import { useLocation } from "react-router";
// import { useSelector } from "react-redux";

function Confirmed() {
    const { state } = useLocation();
    const order = state?.order;
    const delivery_address = order?.delivery_address;
    const futureDate = (() => {
        let date = new Date(order.order_date);
        let daysAdded = 0;
        while (daysAdded < 3) {
            date.setDate(date.getDate() + 1);
            if (date.getDay() !== 0 && date.getDay() !== 6) daysAdded++;
        }
        return `${date.getFullYear()} ${date.toLocaleString("en-US", {
            month: "long",
        })}, ${String(date.getDate()).padStart(2, "0")} (${date.toLocaleString(
            "en-US",
            { weekday: "long" }
        )})`;
    })();
    console.log(order);
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
                {/* <h4>{order.order_id}</h4> */}
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
                        <>
                            Your Product will be delivered by{" "}
                            <b>{futureDate}</b> (link of Order History Page) on
                            your address{" "}
                            <b>
                                {delivery_address.address_line_1 +
                                    ", " +
                                    (delivery_address.address_line_2
                                        ? delivery_address.address_line_2 + ", "
                                        : "") +
                                    delivery_address.city +
                                    ", " +
                                    delivery_address.state +
                                    ", " +
                                    delivery_address.country +
                                    " - " +
                                    delivery_address.pincode}
                            </b>
                        </>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Confirmed;
