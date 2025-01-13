import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, getOrderHistory } from "../actions/orderActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Close } from "@mui/icons-material";

function OrderHistory() {
    const dispatch = useDispatch();
    const {
        orders = [],
        loading,
        error,
    } = useSelector((state) => state.orderHistory);

    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [toggleOrderModal, setToggleOrderModal] = useState(false);

    useEffect(() => {
        dispatch(getOrderHistory());
    }, [dispatch]);

    const handleToggleModal = (orderId) => {
        setSelectedOrderId(orderId);
        setToggleOrderModal((prevState) => !prevState);
    };

    return (
        <>
            <Navbar />
            <div className="order-history-container flex flex-col items-center justify-center m-8">
                <h1 className="sub-heading text-7xl font-bold p-8 flex items-center justify-center gap-8">
                    My Orders
                </h1>
                <div className="history-info-container p-12 flex flex-col items-center justify-center gap-12">
                    {loading && <Loader />}
                    {error && <Error message={error} />}
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div
                                key={order.order_id}
                                className="order-card p-8 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] w-full"
                            >
                                <OrderItem
                                    order={order}
                                    // onOpenModal={handleToggleModal}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No orders found</p>
                    )}
                </div>
            </div>

            {/* Modal for Order Details */}
            {toggleOrderModal && selectedOrderId && (
                <OrderDetail
                    orderId={selectedOrderId}
                    onClose={handleToggleModal}
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
                </button>
            </div>
        </div>
    );
}

function OrderDetail({ orderId, onClose }) {
    const dispatch = useDispatch();
    const { orderDetails, loading, error } = useSelector(
        (state) => state.orderHistory
    );
    console.log("Order Details:", orderDetails);

    useEffect(() => {
        if (orderId) {
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, orderId]);
    console.log("Order Details 2:", orderDetails);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm bg-opacity-75"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-7xl bg-[#e4efe4] rounded-lg p-8 overflow-auto border-2 border-[#014210]"
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
                            <div className="">
                                <p>
                                    <strong>Order ID:</strong>{" "}
                                    {orderDetails.order_id}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {orderDetails.status}
                                </p>
                                <p>
                                    <strong>Tracking Number:</strong>{" "}
                                    {orderDetails.tracking_number}
                                </p>
                                <p>
                                    <strong>Delivery Address:</strong>{" "}
                                    {orderDetails.delivery_address}
                                </p>
                                <p>
                                    <strong>Subtotal:</strong> ₹
                                    {orderDetails.subtotal}
                                </p>
                                <p>
                                    <strong>Tax:</strong> ₹{orderDetails.tax}
                                </p>
                                <p>
                                    <strong>Shipping Charges:</strong> ₹
                                    {orderDetails.shipping_charges}
                                </p>
                                <p>
                                    <strong>Grand Total:</strong> ₹
                                    {orderDetails.grand_total}
                                </p>

                                <h2 className="text-3xl font-semibold">
                                    Order Items:
                                </h2>
                                {orderDetails.order_items &&
                                    orderDetails.order_items.map((item) => (
                                        <div
                                            key={item.product.product_id}
                                            className=""
                                        >
                                            <p>
                                                {item.product.product_name} x{" "}
                                                {item.quantity} - ₹
                                                {item.total_product_price}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrderHistory;
