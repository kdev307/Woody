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

function Cart({ handleCartToggle, className }) {
    const cartItemsList = [
        {
            id: "1",
            name: "Cozy Bed",
            image: "https://example.com/images/cozy-bed.jpg",
            qty: 1,
            price: 15000,
        },
        {
            id: "2",
            name: "Wooden Crib",
            image: "https://example.com/images/wooden-crib.jpg",
            qty: 1,
            price: 8000,
        },
    ];
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
            <ul className="cart-items">
                {cartItemsList.map((cartItem, key) => {
                    return (
                        <li className="cart-item" key={cartItem.id}>
                            <CartItem cartItem={cartItem} />
                        </li>
                    );
                })}
            </ul>
            <div className="cart-info">
                <h3 className="total-info">Total Price: ₹600000000</h3>
                <h3 className="total-info">Quantity: 45</h3>
            </div>
            <div className="cart-btns">
                <button className="cart-btn buy-btn">Buy Now</button>
                <button className="cart-btn cancel-btn">Cancel</button>
            </div>
        </div>
    );
}

function CartItem({ cartItem }) {
    const { name, image, qty, price } = cartItem;
    return (
        <>
            <div className="cart-img-info">
                <img src={image} alt={name} className="cart-item-img" />
                <div className="cart-item-qty">
                    <RemoveCircle
                        style={{ color: "#560000" }}
                        onClick={() => {
                            // handleQtyUpdate(-1);
                        }}
                    />
                    <span>{qty}</span>
                    <AddCircle
                        style={{ color: "#560000" }}
                        onClick={() => {
                            // handleQtyUpdate(1);
                        }}
                    />
                </div>
            </div>
            <div className="cart-item-info">
                <RemoveShoppingCart
                    className="remove-btn"
                    style={{ fontSize: "1.6rem", color: "#560000" }}
                />
                <h4 className="cart-item-name">{name}</h4>
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
