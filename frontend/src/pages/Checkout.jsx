import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchAddresses } from "../actions/userActions";
import { clearCart } from "../actions/cartActions";
import { useNavigate } from "react-router";

function Checkout() {
    const cartItemsList = useSelector((state) => state.cart.cartItemsList);
    return (
        <>
            <Navbar />
            <div className="checkout-conatiner flex items-start justify-center gap-28 p-8">
                <DeliveryAddresses cartItemsList={cartItemsList} />
                <OrderSummary cartItemsList={cartItemsList} />
            </div>
            <Footer />
        </>
    );
}

function DeliveryAddresses({ cartItemsList }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);

    const { userInfo } = userLogin;
    console.log(userInfo);
    const userAddress = useSelector((state) => state.userAddress);
    const { userAddresses, loading, error } = userAddress;

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handlePayment = () => {
        dispatch(clearCart());
        navigate("/confirmed");
    };

    const handleCancel = () => {
        dispatch(clearCart());
    };

    useEffect(() => {
        dispatch(fetchAddresses())
            .then(() => {
                console.log("Addresses fetched successfully");
                // setMessage(userAddresses.details);
                // setMessageType("success");
            })
            .catch((err) => {
                setMessage("Error fetching addresses");
                setMessageType("fail");
                console.error("Error fetching addresses:", err);
            });
    }, [dispatch]);

    const [selectedAddressId, setSelectedAddressId] = useState(null);

    // Handle address selection (checkbox logic for one selection)
    const handleAddressSelect = (id) => {
        setSelectedAddressId((prevId) => (prevId === id ? null : id));
    };

    return (
        <div className="delivery-address w-full rounded-md p-8 shadow-[2px_2px_10px_#c0c0c0]">
            <h2 className="text-[3.2rem] font-semibold text-center p-8">
                Delivery Address
            </h2>
            <div className="addresses">
                {loading && <Loader />}
                {userAddresses.length === 0 ||
                    (!userAddresses && (
                        <p className="text-4xl font-semibold text-[#560000] text-center p-8">
                            {" "}
                            No Address found, update your profile.
                        </p>
                    ))}
                {userInfo &&
                    userAddresses.map((address) => {
                        return (
                            <li
                                key={address.id}
                                className=" flex items-center justify-center gap-8 p-8"
                            >
                                <input
                                    type="radio"
                                    id={`address-${address.id}`}
                                    checked={selectedAddressId === address.id}
                                    onChange={() =>
                                        handleAddressSelect(address.id)
                                    }
                                    className="cursor-pointer text-[#014210] w-10 h-10 border border-[#014210] rounded-full checked:bg-[#027a1c] checked:border-[#027a1c] focus:ring-2 focus:ring-[#027a1c] appearance-none"
                                />
                                <label
                                    htmlFor={`address-${address.id}`}
                                    className="cursor-pointer text-3xl font-semibold w-full text-[#014210]"
                                >
                                    {address.address_line_1 +
                                        ", " +
                                        (address.address_line_2
                                            ? address.address_line_2 + ", "
                                            : "") +
                                        address.city +
                                        ", " +
                                        address.state +
                                        ", " +
                                        address.country +
                                        " - " +
                                        address.pincode}
                                </label>
                            </li>
                        );
                    })}
            </div>
            <div className="flex justify-center items-center gap-8 w-full">
                <button
                    type="submit"
                    disabled={!selectedAddressId || cartItemsList.length === 0}
                    className={`w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-4xl font-semibold transition-all ease-linear duration-1000
                                ${
                                    !selectedAddressId ||
                                    cartItemsList.length === 0
                                        ? "cursor-not-allowed text-[#888] border-[#888] hover:text-[#888] hover:border-[#888] hover:bg-transparent"
                                        : "cursor-pointer hover:bg-[#014210] hover:text-white"
                                }
                                `}
                    onClick={handlePayment}
                >
                    Make Payment
                </button>
                <button
                    type="button"
                    className="w-full p-3 border-[3px] border-[#560000] rounded-md text-[#560000] text-4xl font-semibold hover:bg-[#560000] hover:text-white transition-all ease-linear duration-1000"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

function OrderSummary({ cartItemsList }) {
    const totalQuantity = cartItemsList.reduce(
        (acc, item) => acc + Number(item.qty),
        0
    );
    const subTotal = cartItemsList.reduce(
        (acc, item) => acc + Number(item.productPrice * item.qty),
        0
    );
    const tax = (subTotal * 15) / 100;
    const shippingCharges = subTotal <= 15000 ? 0 : 100;
    const grandTotal = subTotal + shippingCharges + tax;

    return (
        <div className="order-summary w-[50%] rounded-md p-4 shadow-[2px_2px_10px_#c0c0c0]">
            <h2 className="text-[3.2rem] font-semibold text-center p-8">
                Order Summary
            </h2>
            <ul className="items-summary max-h-[28rem] overflow-auto scrollbar-none">
                {cartItemsList.map((item, index) => (
                    <li key={item.productId} className="p-4">
                        <p className="text-4xl font-semibold text-[#014210]">
                            Item {index + 1}: {item.productName}
                        </p>
                        <div className="flex items-center justify-between px-8">
                            {item.productImages?.sort((img1, img2) =>
                                img1.image.localeCompare(img2.image)
                            )[0] && (
                                <img
                                    key={item.productImages[0].id}
                                    src={item.productImages[0].image}
                                    alt={`Product ${item.productImages[0].product_id}`}
                                    className="w-60"
                                />
                            )}
                            <div className="flex flex-col items-end justify-center">
                                <p className="text-[1.8rem] text-[#560000] font-medium ">
                                    Selected Quantity: {item.qty}
                                </p>
                                <p className="text-[1.8rem] text-[#560000] font-medium ">
                                    Price per Item: ₹
                                    {item.productPrice.toFixed(2)}
                                </p>
                                <p className="text-[1.8rem] text-[#560000] font-medium ">
                                    Product Total: ₹
                                    {(item.qty * item.productPrice).toFixed(2)}
                                </p>
                            </div>
                        </div>
                        <hr className="border-gray-300" />
                    </li>
                ))}
            </ul>
            {/* Subtotal, Charges, and Grand Total */}
            <div className="order-summary-details text-2xl p-8 pb-4">
                <div className="flex items-center justify-between text-[#560000] font-medium py-1">
                    <span className="text-[1.5rem]">Total Quantity:</span>
                    <span className="font-semibold text-3xl">
                        {totalQuantity}
                    </span>
                </div>
                <div className="flex items-center justify-between text-[#560000] font-medium py-1">
                    <span className="text-[1.5rem]">Subtotal:</span>
                    <span className="font-semibold text-3xl">
                        ₹ {subTotal.toFixed(2)}
                    </span>
                </div>
                <div className="flex items-center justify-between text-[#560000] font-medium py-1">
                    <span className="text-[1.5rem]">Shipping Charges:</span>
                    <span className="font-semibold text-3xl">
                        {shippingCharges === 0
                            ? "Free"
                            : `₹ ${shippingCharges}`}
                    </span>
                </div>
                <div className="flex items-center justify-between mb-4 text-[#560000] font-medium py-1">
                    <span className="">Taxes:</span>
                    <span className="font-semibold text-3xl">₹ {tax}</span>
                </div>

                {/* Grand Total */}
                <div className="text-[#014210] flex items-center justify-between border-t border-gray-300 py-4">
                    <span className="text-3xl  font-semibold">
                        Grand Total:
                    </span>
                    <span className="text-4xl font-bold">
                        ₹ {grandTotal.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-300 p-4" />

            {/* Estimated Delivery */}
            <p className="text-2xl text-gray-700 text-center">
                Estimated Delivery:{" "}
                <span className="font-semibold text-[#014210]">
                    Before (Date of Delivery i.e., within 3 working days from
                    Date of Purchase)
                </span>
            </p>
        </div>
    );
}

export default Checkout;
