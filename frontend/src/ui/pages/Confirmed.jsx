import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
    Celebration,
    CheckCircle,
    Favorite,
    History,
    Schedule,
    StoreMallDirectory,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../../redux/actions/orderActions";

function Confirmed() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    const { success, error } = useSelector((state) => state.orderStatus);
    useEffect(() => {
        if (!order) {
            navigate("/checkout", {
                state: order,
            });
        }
        dispatch(updateOrderStatus(order.order_id, "placed"));
    }, [order, navigate, dispatch]);
    console.log(order);
    return (
        <>
            <Navbar />
            <div className="order-confirmed-container flex flex-col items-center justify-center min-h-[35rem]">
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
                    className="w-[30%] object-contain"
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
                            <b>{futureDate}</b> on your address{" "}
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
                    <div className="flex items-center justify-center gap-4 text-[#014210] text-3xl p-4">
                        <Link to="/store">
                            <button className="profile-btn history-btn flex items-center justify-center gap-6 w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-[2.4rem] font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000">
                                Shop More
                                <StoreMallDirectory
                                    style={{ fontSize: "3.2rem" }}
                                />
                            </button>
                        </Link>

                        <Link to="/order-history">
                            <button className="history-btn flex items-center justify-center gap-6 w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-[2.4rem] font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000">
                                My Orders
                                <History style={{ fontSize: "3.2rem" }} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Confirmed;
