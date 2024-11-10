import React from "react";
import "../styles/common.css";

function Confirmed() {
    return (
        <div className="order-confirmed-container">
            <h1 class="sub-heading">Order Confirmed !</h1>
            <h2 class="lines"></h2>

            <h2 class="sub-heading">Congratulations....!!!!</h2>
            <div class="check-icon">&#10003;</div>
            <div class="desc">
                <p>Your order has been successfully placed.</p>
                <p>Thank you for shopping with us !</p>
                <br />
                <br />
                <p>
                    Your Product will be Delivered <b>within 3 Working Days</b> from the Date of
                    Purchase.
                </p>
            </div>
        </div>
    );
}

export default Confirmed;
