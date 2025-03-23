import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useDispatch, useSelector } from "react-redux";
import {
    getOrderDetails,
    getOrderHistory,
} from "../../redux/actions/orderActions";
import { Close, ListAlt } from "@mui/icons-material";
import ShimmerOrderHistory from "../layouts/ShimmerOrderHistory";

function OrderHistory() {
    const dispatch = useDispatch();
    const {
        orders = [],
        loading,
        error,
    } = useSelector((state) => state.orderHistory);

    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [toggleOrderModal, setToggleOrderModal] = useState(false);

    const [selectedFilter, setSelectedFilter] = useState("All");
    const [activeFilter, setActiveFilter] = useState("All");

    const [sortBy, setSortBy] = useState("");
    const [activeSort, setActiveSort] = useState("");

    useEffect(() => {
        dispatch(getOrderHistory());
    }, [dispatch]);

    const handleToggleOrderModal = (orderId) => {
        setSelectedOrderId(orderId);
        console.log("Selected Order ID:", orderId);
        setToggleOrderModal((prevState) => !prevState);
    };

    const orderFilters = ["Cancelled", "Delivered", "Dispatched", "Placed"];

    const sortButtons = [
        { sortName: "Date -- Newset First", methodName: "newDateFirst" },
        { sortName: "Date -- Oldest First", methodName: "oldDateFirst" },
    ];

    const handleOrderFilter = (filter) => {
        if (selectedFilter === filter) {
            // If the same filter is clicked again, disable the filter
            setSelectedFilter("All");
            setActiveFilter("All");
        } else {
            // Otherwise, activate the new filter
            setSelectedFilter(filter);
            setActiveFilter(filter);
        }
    };

    let filteredOrders = orders.filter(
        (order) =>
            selectedFilter === "All" ||
            order.status.includes(selectedFilter.toLowerCase())
    );
    let sortedOrders = [...filteredOrders];
    if (sortBy === "newDateFirst") {
        sortedOrders.sort(
            (a, b) => new Date(b.order_date) - new Date(a.order_date)
        );
    } else if (sortBy === "oldDateFirst") {
        sortedOrders.sort(
            (a, b) => new Date(a.order_date) - new Date(b.order_date)
        );
    }

    return (
        <>
            <Navbar />
            <div className="order-history-container flex flex-col items-center justify-center m-8 min-h-[35rem]">
                <h1 className="sub-heading text-7xl font-bold p-8 flex items-center justify-center gap-8">
                    My Orders
                </h1>
                <div
                    className={`history-info-container ${
                        loading ? "w-[120rem]" : ""
                    } p-12 flex flex-col items-center justify-center gap-12`}
                >
                    {loading ? (
                        <ShimmerOrderHistory />
                    ) : error ? (
                        <Error message={error} />
                    ) : (
                        <>
                            <div className="flex items-center justify-center gap-[40rem] w-full">
                                <ul className="sort-btns flex lg_tab:hidden justify-center items-center gap-8 w-full">
                                    {sortButtons.map((sortBtn, index) => (
                                        <li key={index}>
                                            <button
                                                className={`relative bg-transparent border-none p-2 cursor-pointer text-[1.8rem]
                                                ${
                                                    activeSort ===
                                                    sortBtn.methodName
                                                        ? "text-[#014210] font-semibold"
                                                        : ""
                                                } group
                                        `}
                                                onClick={() => {
                                                    setActiveSort(
                                                        sortBtn.methodName
                                                    );
                                                    setSortBy(
                                                        sortBtn.methodName
                                                    );
                                                }}
                                            >
                                                {sortBtn.sortName}
                                                <span
                                                    className={`absolute left-0 right-0 bottom-[-0.2rem] h-[2px] bg-[#014210] 
                                                    ${
                                                        activeSort ===
                                                        sortBtn.methodName
                                                            ? "scale-x-100"
                                                            : "scale-x-0"
                                                    } group-hover:scale-x-100
                                                transition-transform duration-300`}
                                                ></span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="sort-btns flex lg_tab:hidden justify-center items-center gap-8 w-full">
                                    {orderFilters.map((orderFilter, index) => (
                                        <li key={index}>
                                            <button
                                                className={`relative bg-transparent border-none p-2 cursor-pointer text-[1.8rem]
                                                    ${
                                                        activeFilter ===
                                                        orderFilter
                                                            ? "text-[#014210] font-semibold"
                                                            : ""
                                                    } group
                                                    `}
                                                onClick={() => {
                                                    handleOrderFilter(
                                                        orderFilter
                                                    );
                                                }}
                                            >
                                                {orderFilter}
                                                <span
                                                    className={`absolute left-0 right-0 bottom-[-0.2rem] h-[2px] bg-[#014210] 
                                                        ${
                                                            activeFilter ===
                                                            orderFilter
                                                                ? "scale-x-100"
                                                                : "scale-x-0"
                                                        } group-hover:scale-x-100
                                                        transition-transform duration-300`}
                                                ></span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {sortedOrders.length > 0 ? (
                                sortedOrders.map((order) => (
                                    <div
                                        key={order.order_id}
                                        className="order-card p-8 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] w-full"
                                    >
                                        <OrderItem
                                            order={order}
                                            onOpenModal={handleToggleOrderModal}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-4xl text-[#560000] font-semibold p-16">
                                    No orders found
                                </p>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Modal for Order Details */}
            {toggleOrderModal && selectedOrderId && (
                <OrderDetail
                    orderId={selectedOrderId}
                    onClose={handleToggleOrderModal}
                />
            )}

            <Footer />
        </>
    );
}

function OrderItem({ order, onOpenModal }) {
    const delivery_address = order?.delivery_address;
    return (
        <div className="order-item flex flex-col items-center justify-center gap-12 text-3xl w-full px-4 text-[#560000]">
            <div className="order-header flex justify-between items-center w-full">
                <div className="order-id">
                    Order ID: <strong>#{order.order_id}</strong>
                </div>
                <div className="order-status capitalize">
                    Status: <strong>{order.status}</strong>
                </div>
            </div>
            <div className="tracking-number self-start">
                Tracking Number:
                <strong> {order.tracking_number || "Not Assigned"}</strong>
            </div>

            <div className="delivery-address self-start">
                Delivery Address:{" "}
                <strong>
                    {delivery_address
                        ? delivery_address.address_line_1 +
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
                          delivery_address.pincode
                        : "N/A"}
                </strong>
            </div>

            <div className="order-prices flex justify-between items-center w-full">
                <div className="price">
                    Subtotal: <strong>₹{order.subtotal}</strong>
                </div>
                <div className="price">
                    Tax: <strong>₹{order.tax}</strong>
                </div>
                <div className="price">
                    Shipping Charges: <strong>₹{order.shipping_charges}</strong>
                </div>
                <div className="price">
                    Grand Total: <strong>₹{order.grand_total}</strong>
                </div>
            </div>
            <hr
                style={{
                    width: "100%",
                    margin: "auto",
                    border: "0.19rem solid #560000",
                    borderRadius: "100rem",
                    boxShadow: "5px 5px 10px #560000",
                }}
            />
            <div className="flex items-center justify-evenly w-full text-[#014210]">
                <p className="w-full">
                    Date of Purchase:{" "}
                    <strong>
                        {new Date(order.order_date).toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                    </strong>
                </p>
                <button
                    className="view-order text-4xl flex items-center justify-center gap-6 w-full p-3 border-2 border-[#014210] rounded-md text-[#014210] font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000"
                    onClick={() => onOpenModal(order.order_id)}
                >
                    View Order
                    <ListAlt style={{ fontSize: "3.6rem" }} />
                </button>
            </div>
        </div>
    );
}

function OrderDetail({ orderId, onClose }) {
    const dispatch = useDispatch();
    const {
        orderDetails = [],
        loading,
        error,
    } = useSelector((state) => state.orderHistory);
    console.log("Order Details: ", orderDetails);

    console.log("Order ID: ", orderId);
    useEffect(() => {
        console.log("Order ID in useEffect: ", orderId);
        if (orderId) {
            console.log("Fetching order details for order:", orderId);
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, orderId]);

    return (
        <div
            className="fixed w-full inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm bg-opacity-75"
            onClick={onClose}
        >
            <div
                className="relative w-[90%]  bg-[#e4efe4] rounded-lg p-8 overflow-auto border-2 border-[#014210]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="pt-12 flex items-center justify-end">
                    <Close
                        className="cart-close-btn cursor-pointer text-[#014210] text-4xl absolute top-8 right-20"
                        style={{ fontSize: "3.6rem" }}
                        onClick={onClose}
                    />
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Error message={error} />
                    ) : (
                        <>
                            <h1 className="text-5xl font-bold text-[#014210] text-center">
                                Order Detail (ID: #{orderId})
                            </h1>

                            <div className="max-h-[50rem] overflow-auto scrollbar-none w-full p-8 m-4">
                                <table className="w-full table-auto shadow-[2px_2px_5px_#014210] p-4">
                                    <thead className="bg-[#014210] text-white text-4xl font-semibold shadow-[5px_5px_10px_#014210]">
                                        <tr className="flex items-center justify-center text-center text-shadow-[2px_2px_5px_#fff]">
                                            <th className="p-4 text-center w-[50%]">
                                                S.No
                                            </th>
                                            <th className="p-4 text-center w-full">
                                                Product Image
                                            </th>
                                            <th className="p-4 text-center w-full">
                                                Product Name
                                            </th>
                                            <th className="p-4 text-center w-full">
                                                Product Price (in ₹)
                                            </th>
                                            <th className="p-4 text-center w-[50%]">
                                                Quantity
                                            </th>
                                            <th className="p-4 text-center w-full">
                                                Total Price (in ₹)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-4xl font-medium">
                                        {orderDetails.order_items &&
                                            orderDetails.order_items.map(
                                                (item, index) => (
                                                    <>
                                                        <tr
                                                            key={
                                                                item.product_id
                                                            }
                                                            className="flex items-center justify-center text-center p-4"
                                                        >
                                                            <td className="p-4 text-center w-[50%]">
                                                                {index + 1}
                                                            </td>
                                                            <td className="p-4 text-center w-full">
                                                                <img
                                                                    src={
                                                                        item.product_image
                                                                    }
                                                                    alt={
                                                                        item.product_name
                                                                    }
                                                                    className="w-[30rem] object-cover rounded-full shadow-[3px_3px_6px_#014210]"
                                                                />
                                                            </td>
                                                            <td className="p-4 text-center w-full">
                                                                {
                                                                    item.product_name
                                                                }
                                                            </td>
                                                            <td className="p-4 text-center w-full">
                                                                {item.total_product_price /
                                                                    item.quantity}
                                                            </td>
                                                            <td className="p-4 text-center w-[50%]">
                                                                {item.quantity}
                                                            </td>
                                                            <td className="p-4 text-center w-full">
                                                                {
                                                                    item.total_product_price
                                                                }
                                                            </td>
                                                        </tr>
                                                        {index !==
                                                            orderDetails
                                                                .order_items
                                                                .length -
                                                                1 && (
                                                            <hr
                                                                style={{
                                                                    width: "90%",
                                                                    margin: "auto",
                                                                    border: "0.19rem solid #014210",
                                                                    borderRadius:
                                                                        "100rem",
                                                                    boxShadow:
                                                                        "5px 5px 10px #014210",
                                                                }}
                                                            />
                                                        )}
                                                    </>
                                                )
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrderHistory;
