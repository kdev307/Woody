import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
    dispatchOrder,
    getPendingOrderDetails,
    getPendingOrders,
} from "../actions/adminActions";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { Close, ListAlt, LocalShipping } from "@mui/icons-material";

function OrderDispatch() {
    const dispatch = useDispatch();
    const {
        orders = [],
        loading,
        error,
    } = useSelector((state) => state.adminAllOrders);

    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [toggleOrderModal, setToggleOrderModal] = useState(false);

    const [selectedFilter, setSelectedFilter] = useState("All");
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        dispatch(getPendingOrders());
    }, [dispatch]);

    const handleToggleOrderModal = (orderId) => {
        setSelectedOrderId(orderId);
        console.log("Selected Order ID:", orderId);
        setToggleOrderModal((prevState) => !prevState);
    };

    const handleDispatch = async (orderId) => {
        try {
            await dispatch(dispatchOrder(orderId)); // Dispatch the action to mark the product as dispatched
            console.log("Order dispatched successfully:", orderId);

            // Fetch pending orders again after successful dispatch
            dispatch(getPendingOrders());
        } catch (error) {
            console.error("Error dispatching order:", error);
        }
    };

    const orderFilters = ["Cancelled", "Delivered", "Dispatched", "Placed"];

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

    return (
        <>
            <Navbar />
            <div className="order-dispatch-container min-h-[35rem]">
                <h1 className="sub-heading text-7xl font-bold p-8 flex items-center justify-center gap-8">
                    Pending Orders
                </h1>
                <div className="orders-container flex flex-col items-center justify-center">
                    <ul className="px-12 py-0 sort-btns flex lg_tab:hidden justify-start items-center gap-8 w-full">
                        {orderFilters.map((orderFilter, index) => (
                            <li key={index}>
                                <button
                                    className={`relative bg-transparent border-none p-2 cursor-pointer text-[1.8rem]
                                            ${
                                                activeFilter === orderFilter
                                                    ? "text-[#014210] font-semibold"
                                                    : ""
                                            } group
                                            `}
                                    onClick={() => {
                                        handleOrderFilter(orderFilter);
                                    }}
                                >
                                    {orderFilter}
                                    <span
                                        className={`absolute left-0 right-0 bottom-[-0.2rem] h-[2px] bg-[#014210] 
                                                ${
                                                    activeFilter === orderFilter
                                                        ? "scale-x-100"
                                                        : "scale-x-0"
                                                } group-hover:scale-x-100
                                                    transition-transform duration-300`}
                                    ></span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    {loading && <Loader />}
                    {error && <Error message={error} />}
                    {filteredOrders.length > 0 ? (
                        <div className="w-full overflow-auto p-12">
                            <table className="table-auto shadow-md border-collapse mx-auto">
                                <thead className="bg-[#014210] text-white text-4xl font-semibold">
                                    <tr className="p-8">
                                        <th className="p-8">S.No.</th>
                                        <th className="p-8">Order ID</th>
                                        <th className="p-8">Order by</th>
                                        <th className="p-8 w-[30%]">
                                            Delivery At
                                        </th>
                                        <th className="p-8">Order Date</th>
                                        <th className="p-8">Amount Paid</th>
                                        <th className="p-8">Status</th>
                                        <th className="p-8">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-3xl font-medium bg-[#edf2ed]">
                                    {filteredOrders.map((order, index) => (
                                        <tr
                                            key={order.order_id}
                                            className="border-b border-[#ddd] p-8"
                                        >
                                            <td className="p-8 text-center">
                                                {index + 1}
                                            </td>
                                            <td className="p-8 text-center">
                                                #{order.order_id}
                                            </td>
                                            <td className="p-8 text-center">
                                                {order.user}
                                            </td>
                                            <td className="p-8 text-center w-[30%]">
                                                {order?.delivery_address
                                                    ? order.delivery_address
                                                          .address_line_1 +
                                                      ", " +
                                                      (order.delivery_address
                                                          .address_line_2
                                                          ? order
                                                                .delivery_address
                                                                .address_line_2 +
                                                            ", "
                                                          : "") +
                                                      order.delivery_address
                                                          .city +
                                                      ", " +
                                                      order.delivery_address
                                                          .state +
                                                      ", " +
                                                      order.delivery_address
                                                          .country +
                                                      " - " +
                                                      order.delivery_address
                                                          .pincode
                                                    : "N/A"}
                                            </td>
                                            <td className="p-8 text-center">
                                                {new Date(
                                                    order.order_date
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td className="p-8 text-center capitalize">
                                                ₹ {order.grand_total}
                                            </td>
                                            <td className="p-8 text-center capitalize">
                                                {order.status}
                                            </td>
                                            <td className="p-8 text-center flex flex-col items-center justify-center font-semibold gap-8">
                                                <button
                                                    className="view-order text-4xl flex items-center justify-center gap-6 w-full p-3 border-2 border-[#014210] rounded-md text-[#014210] font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-1000"
                                                    onClick={() =>
                                                        handleToggleOrderModal(
                                                            order.order_id
                                                        )
                                                    }
                                                >
                                                    View Order
                                                    <ListAlt
                                                        style={{
                                                            fontSize: "3.6rem",
                                                        }}
                                                    />
                                                </button>
                                                {order.status !==
                                                "dispatched" ? (
                                                    <button
                                                        className={`dispatch-order text-4xl flex items-center justify-center gap-6 w-full p-3 border-2 border-[#560000] rounded-md text-[#560000] font-semibold transition-all ease-linear duration-1000
                                                            ${
                                                                order.status !==
                                                                "placed"
                                                                    ? "cursor-not-allowed text-[#888] border-[#888] hover:text-[#888] hover:border-[#888] hover:bg-transparent"
                                                                    : "cursor-pointer hover:bg-[#560000] hover:text-white"
                                                            }`}
                                                        disabled={
                                                            order.status !==
                                                            "placed"
                                                        }
                                                        onClick={() =>
                                                            handleDispatch(
                                                                order.order_id
                                                            )
                                                        }
                                                    >
                                                        Dispatch
                                                        <LocalShipping
                                                            style={{
                                                                fontSize:
                                                                    "3.6rem",
                                                            }}
                                                        />
                                                    </button>
                                                ) : (
                                                    ""
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-4xl text-[#560000] font-semibold p-16">
                            No orders available.
                        </p>
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

function OrderDetail({ orderId, onClose }) {
    const dispatch = useDispatch();
    const {
        orderDetails = [],
        loading,
        error,
    } = useSelector((state) => state.adminAllOrders);
    console.log("Order Details: ", orderDetails);

    console.log("Order ID: ", orderId);
    useEffect(() => {
        console.log("Order ID in useEffect: ", orderId);
        if (orderId) {
            console.log("Fetching order details for order:", orderId);
            dispatch(getPendingOrderDetails(orderId));
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

export default OrderDispatch;
