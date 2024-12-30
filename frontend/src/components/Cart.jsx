import React, { useState } from "react";
import {
    ShoppingCart,
    Close,
    RemoveShoppingCart,
    RemoveCircle,
    AddCircle,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
    removeFromCart,
    updateCartQuantity,
    clearCart,
} from "../actions/cartActions";
// import { useNavigate } from "react-router";

function Cart({ handleCartToggle, isOpen }) {
    const cartItemsList = useSelector((state) => state.cart.cartItemsList);
    const totalQuantity = cartItemsList.reduce(
        (acc, item) => acc + Number(item.qty),
        0
    );
    const totalPrice = cartItemsList.reduce(
        (acc, item) => acc + Number(item.productPrice * item.qty),
        0
    );
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const { isAuthenticated } = useSelector((state) => state.user);

    const handleClearCart = () => {
        const confirmClear = window.confirm(
            "Are you sure you want to cancel your order ?"
        );
        if (confirmClear) {
            dispatch(clearCart());
        }
    };
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const handleBuyNow = () => {
        if (!userInfo) {
            alert("Please login to your account for placing order");
            // handleCartToggle(false);
        } else {
            const confirmOrder = window.confirm(
                "Are you sure you want to proceed with the order?"
            );
            if (confirmOrder) {
                dispatch(clearCart());
                alert(
                    "Order Confirmed ! Thank You for Shopping with us. :) :)"
                );
            }
        }
    };

    console.log("Cart items:", cartItemsList);
    return (
        <div
            className={`cart fixed top-0 right-0 w-[50rem] h-full py-4 px-8 bg-[#e4efe4] shadow-[rgba(0,0,0,0.5)_-2px_0_5px] z-[1000] transform transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="pt-4 flex items-center justify-end mt-32 mr-12 sm_desk:mt-0">
                <div className="pt-12 flex items-center justify-end mr-12">
                    <Close
                        className="cart-close-btn cursor-pointer text-[#014210] text-4xl absolute top-8 right-20"
                        style={{ fontSize: "3.6rem" }}
                        onClick={() => {
                            handleCartToggle();
                        }}
                    />
                </div>
            </div>
            <div className="sm_desk:scale-90">
                <h1 className="cart-title flex items-center justify-center gap-16 -mt-8 text-7xl text-center text-[#014210] font-bold">
                    My Cart
                    <ShoppingCart
                        style={{ fontSize: "4.8rem", color: "#014210" }}
                    />
                </h1>
                {cartItemsList.length === 0 ? (
                    <strong className="cart-message block text-[#560000] text-center text-3xl my-8 mx-auto">
                        Your cart is empty
                    </strong>
                ) : (
                    <ul className="cart-items scrollbar max-h-[50rem] overflow-y-auto py-4 mt-8 px-8">
                        {cartItemsList.map((cartItem) => {
                            return (
                                <li
                                    className="cart-item grid grid-cols-[1fr_3fr] items-start justify-center p-2"
                                    key={cartItem.productId}
                                >
                                    <CartItem cartItemData={cartItem} />
                                </li>
                            );
                        })}
                    </ul>
                )}
                <div className="cart-info flex items-center justify-evenly pl-0 text-[#014210] font-semibold text-4xl p-8 ">
                    <h3 className="total-info">Total Price: ₹{totalPrice}</h3>
                    <h3 className="total-info">Quantity: {totalQuantity}</h3>
                </div>
                <div className="cart-btns flex flex-col items-center justify-center pl-0 text-center gap-4 ">
                    <button
                        className="cart-btn buy-btn flex items-center justify-center gap-8 w-full p-3 border-[3px] border-[#014210] rounded-md text-[#014210] text-[2.4rem] font-semibold hover:bg-[#014210] hover:text-white transition-all ease-linear duration-200"
                        disabled={cartItemsList.length === 0}
                        aria-disabled={cartItemsList.length === 0}
                        onClick={handleBuyNow}
                    >
                        Buy Now
                    </button>
                    <button
                        className="cart-btn cancel-btn flex items-center justify-center gap-8 w-full p-3 border-[3px] border-[#560000] rounded-md text-[#560000] text-[2.4rem] font-semibold hover:bg-[#560000] hover:text-white transition-all ease-linear duration-200"
                        disabled={cartItemsList.length === 0}
                        aria-disabled={cartItemsList.length === 0}
                        onClick={handleClearCart}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

function CartItem({ cartItemData }) {
    const {
        productId,
        productBrand,
        productName,
        productImages,
        qty,
        productStockCount,
        productPrice,
    } = cartItemData;
    const dispatch = useDispatch();
    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(productId));
    };

    const handleQuantityUpdate = (change) => {
        const newQty = qty + change;
        console.log("Current Quantity:", qty);
        console.log("New Quantity:", newQty);
        console.log("Stock Count:", productStockCount);
        if (newQty > 0 && newQty < productStockCount)
            dispatch(updateCartQuantity(productId, newQty));
        else if (newQty <= 0) {
            dispatch(removeFromCart(productId));
        }
    };

    return (
        <>
            <div className="cart-img-info w-64 flex flex-col items-center justify-center gap-4">
                {productImages?.sort((img1, img2) =>
                    img1.image.localeCompare(img2.image)
                )[0] && (
                    <img
                        key={productImages[0].id}
                        src={productImages[0].image}
                        alt={`Product ${productImages[0].product_id}`}
                        className="w-full"
                    />
                )}
                <div className="cart-item-qty flex items-center justify-center gap-3">
                    <RemoveCircle
                        className="update-btn cursor-pointer"
                        style={{ color: "#560000", fontSize: "3.2rem" }}
                        onClick={() => {
                            handleQuantityUpdate(-1);
                            // console.log("-1");
                        }}
                    />
                    <span className="text-3xl">{qty}</span>
                    <AddCircle
                        className="update-btn cursor-pointer"
                        style={{ color: "#560000", fontSize: "3.2rem" }}
                        onClick={() => {
                            handleQuantityUpdate(1);
                            // console.log("+1");
                        }}
                    />
                </div>
            </div>
            <div className="cart-item-info flex flex-col justify-start items-end px-8 text-end gap-8">
                <RemoveShoppingCart
                    className="remove-btn cursor-pointer"
                    style={{ fontSize: "2.8rem", color: "#560000" }}
                    onClick={handleRemoveFromCart}
                />
                <h4 className="cart-item-name font-semibold text-3xl text-[#560000]">
                    {productBrand + " | " + productName}
                </h4>
                <h4 className="cart-total-price text-4xl font-bold text-[#014210]">
                    ₹ {productPrice * qty}
                </h4>
            </div>
            <p className="endLine text-xl text-center">
                <hr
                    style={{
                        width: "250%",
                        border: "0.2rem solid #014210",
                        borderRadius: "100rem",
                        margin: "1rem 0",
                    }}
                />
            </p>
        </>
    );
}

export default Cart;
