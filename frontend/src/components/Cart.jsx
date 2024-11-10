import React, { useState } from "react";
import {
    ShoppingCart,
    Close,
    RemoveShoppingCart,
    RemoveCircle,
    AddCircle,
} from "@mui/icons-material";
import "../styles/common.css";
import "../styles/cart.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartQuantity, clearCart } from "../actions/cartActions";
import { useNavigate } from "react-router";

function Cart({ handleCartToggle, className }) {
    const cartItemsList = useSelector((state) => state.cart.cartItemsList);
    const totalQuantity = cartItemsList.reduce((acc, item) => acc + Number(item.qty), 0);
    const totalPrice = cartItemsList.reduce((acc, item) => acc + Number(item.price * item.qty), 0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { isAuthenticated } = useSelector((state) => state.user);

    const handleClearCart = () => {
        const confirmClear = window.confirm("Are you sure you want to cancel your order ?");
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
            const confirmOrder = window.confirm("Are you sure you want to proceed with the order?");
            if (confirmOrder) {
                dispatch(clearCart());
                alert("Order Confirmed ! Thank You for Shopping with us. :) :)");
            }
        }
    };

    console.log("Cart items:", cartItemsList);
    return (
        <div className={`cart ${className}`}>
            <Close
                className="cart-close-btn"
                style={{ fontSize: "2.4rem" }}
                onClick={() => {
                    handleCartToggle();
                }}
            />
            <div className="cart-heading">
                <h1 className="cart-title">My Cart</h1>
                <ShoppingCart style={{ fontSize: "2.4rem", color: "#014210" }} />
            </div>
            {cartItemsList.length === 0 ? (
                <strong className="cart-message">Your cart is empty</strong>
            ) : (
                <ul className="cart-items">
                    {cartItemsList.map((cartItem) => {
                        return (
                            <li className="cart-item" key={cartItem.productId}>
                                <CartItem cartItemData={cartItem} />
                            </li>
                        );
                    })}
                </ul>
            )}
            <div className="cart-info">
                <h3 className="total-info">Total Price: ₹{totalPrice}</h3>
                <h3 className="total-info">Quantity: {totalQuantity}</h3>
            </div>
            <div className="cart-btns">
                <button
                    className="cart-btn buy-btn"
                    disabled={cartItemsList.length === 0}
                    aria-disabled={cartItemsList.length === 0}
                    onClick={handleBuyNow}
                >
                    Buy Now
                </button>
                <button
                    className="cart-btn cancel-btn"
                    disabled={cartItemsList.length === 0}
                    aria-disabled={cartItemsList.length === 0}
                    onClick={handleClearCart}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

function CartItem({ cartItemData }) {
    const { productId, productBrand, productName, image, qty, stockCount, price } = cartItemData;
    const dispatch = useDispatch();
    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(productId));
    };

    const handleQuantityUpdate = (change) => {
        const newQty = qty + change;
        console.log("Current Quantity:", qty);
        console.log("New Quantity:", newQty);
        console.log("Stock Count:", stockCount);
        if (newQty > 0 && newQty < stockCount) dispatch(updateCartQuantity(productId, newQty));
        else if (newQty <= 0) {
            dispatch(removeFromCart(productId));
        }
    };

    return (
        <>
            <div className="cart-img-info">
                <img src={image} alt={productName} className="cart-item-img" />
                <div className="cart-item-qty">
                    <RemoveCircle
                        className="update-btn"
                        style={{ color: "#560000" }}
                        onClick={() => {
                            handleQuantityUpdate(-1);
                            // console.log("-1");
                        }}
                    />
                    <span>{qty}</span>
                    <AddCircle
                        className="update-btn"
                        style={{ color: "#560000" }}
                        onClick={() => {
                            handleQuantityUpdate(1);
                            // console.log("+1");
                        }}
                    />
                </div>
            </div>
            <div className="cart-item-info">
                <RemoveShoppingCart
                    className="remove-btn"
                    style={{ fontSize: "1.6rem", color: "#560000" }}
                    onClick={handleRemoveFromCart}
                />
                <h4 className="cart-item-name">{productBrand + " " + productName}</h4>
                <h4 className="cart-total-price">₹ {price * qty}</h4>
            </div>
            <p className="endLine">
                <hr
                    style={{
                        width: "200%",
                        margin: "auto",
                        border: "0.1rem solid #014210",
                        borderRadius: "100rem",
                    }}
                />
            </p>
        </>
    );
}

export default Cart;
